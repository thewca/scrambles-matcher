import { groupBy, flatMap, sortBy } from './utils';

// TODO: implement a proper "allScramblePresent" function
// For attempt-based event (mbf, fm), we should not only check that we have one scramble,
// but one scramble for each attempt.

export const eventIdFromRound = round => round.id.split("-")[0];
export const roundNumberFromRound = round => round.id.split("-")[1].substring(1);

export const registrantIdFromAttributes = (persons, name, country, wcaId) =>
  persons.find(p => p.name === name && p.country === country && p.wcaId === wcaId).registrantId;

export const internalScramblesToWcifScrambles = (eventId, scrambles) => {
  if (scrambles.length === 0)
    return scrambles;
  if (eventId === "333mbf") {
    // We need to combine all scrambles for each attempt,
    // in the end there will be one scramble sheet with X scramble sequences,
    // where X is the number of attempts.
    let scramblesByAttempt = groupBy(scrambles, s => s.attemptNumber);
    let sheet = {
      id: scrambles[0].id,
      scrambles: [],
      extraScrambles: [],
    }
    Object.keys(scramblesByAttempt).sort().forEach(number =>
      sheet.scrambles.push(scramblesByAttempt[number].map(s => s.scrambles).join("\n")));
    return [sheet];
  } else if (eventId === "333fm") {
    // We can't track yet in the WCIF which scramble was for witch attempt,
    // so let's just sort them by attempt id and combine them in one
    // scramble sheet.
    // There is usually only one group for FM, the only case where we would
    // like more scramble than expected is when something terrible happened
    // and an extra was needed.
    return [{
      id: scrambles[0].id,
      scrambles: flatMap(sortBy(scrambles, s => s.attemptNumber), s => s.scrambles),
      extraScrambles: [],
    }];
  }
  return scrambles.map(set => {
    return {
      id: set.id,
      scrambles: set.scrambles,
      extraScrambles: set.extraScrambles,
    }
  });
}

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
        // TODO: name to id
        countryId: p.country,
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
            results: [],
            groups: [],
          }
        }),
      }
    }),
    // TODO: make sure that only one tnoodle was used, then add an explicit field for that?
    scrambleProgram: wcif.scrambleProgram,
    resultsProgram: "Scrambles Matcher",
  };
};
