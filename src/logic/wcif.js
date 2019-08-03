import { internalScramblesToWcifScrambles, prefixForIndex } from './scrambles';
import { countryById } from './countries';

// TODO: implement a proper "allScramblePresent" function
// For attempt-based event (mbf, fm), we should not only check that we have one scramble,
// but one scramble for each attempt.

export const eventIdFromRound = round => round.id.split("-")[0];
export const roundNumberFromRound = round => round.id.split("-")[1].substring(1);

export const registrantIdFromAttributes = (persons, name, country, wcaId) =>
  persons.find(p => p.name === name && p.country === country && p.wcaId === wcaId).registrantId;

const WcifScramblesToResultsGroups = scrambles => scrambles.map((sheet, index) => {
  return {
    group: prefixForIndex(index),
    scrambles: sheet.scrambles,
    extraScrambles: sheet.extraScrambles || [],
  };
});

export const internalWcifToWcif = wcif => {
  // We only alter the scrambles, so make them right wrt the WCIF.
  return {
    ...wcif,
    events: wcif.events.map(e => {
      return {
        ...e,
        rounds: e.rounds.map(r => {
          return {
            ...r,
            scrambleSets: internalScramblesToWcifScrambles(e.id, r.scrambleSets),
          }
        }),
      };
    }),
  }
};

export const internalWcifToResultsJson = wcif => {
  return {
    competitionFormat: "WCA Competition 0.3",
    competitionId: wcif.id,
    persons: wcif.persons.map(p => {
      return {
        id: p.registrantId,
        name: p.name,
        wcaId: p.wcaId || "",
        countryId: countryById(p.country).iso2,
        gender: p.gender,
        dob: p.birthdate,
      };
    }),
    events: wcif.events.map(e => {
      return {
        eventId: e.id,
        rounds: e.rounds.map(r => {
          return {
            roundId: roundNumberFromRound(r),
            formatId: r.format,
            results: r.results.map(res => {
              return {
                personId: res.personId,
                position: res.ranking,
                results: res.attempts.map(a => a.result),
                best: res.best,
                average: res.average,
              };
            }),
            groups: WcifScramblesToResultsGroups(internalScramblesToWcifScrambles(e.id,
              r.scrambleSets)),
          }
        }),
      }
    }),
    // TODO: make sure that only one tnoodle was used, then add an explicit field for that?
    scrambleProgram: wcif.scrambleProgram,
    resultsProgram: "Scrambles Matcher",
  };
};
