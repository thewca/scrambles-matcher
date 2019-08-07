import { internalScramblesToWcifScrambles, prefixForIndex } from './scrambles';
import { countryById } from './countries';
import { formatById } from './formats';
import { groupBy } from './utils';
import { roundTypeIdForRound } from './events';

export const parseActivityCode = activityCode => {
  const [, e, r, g, a] = activityCode.match(
    /(\w+)(?:-r(\d+))?(?:-g(\d+))?(?:-a(\d+))?/
  );
  return {
    eventId: e,
    roundNumber: r && parseInt(r, 10),
    groupNumber: g && parseInt(g, 10),
    attemptNumber: a && parseInt(a, 10),
  };
};

export const registrantIdFromAttributes = (persons, name, country, wcaId) =>
  persons.find(
    p => p.name === name && p.country === country && p.wcaId === wcaId
  ).registrantId;

const WcifScramblesToResultsGroups = scrambles =>
  scrambles.map((sheet, index) => ({
    group: prefixForIndex(index),
    scrambles: sheet.scrambles,
    extraScrambles: sheet.extraScrambles || [],
  }));

export const internalWcifToWcif = wcif => ({
  // We only alter the scrambles, so make them right wrt the WCIF.
  ...wcif,
  events: wcif.events.map(e => ({
    ...e,
    rounds: e.rounds.map(r => ({
      ...r,
      scrambleSets: internalScramblesToWcifScrambles(e.id, r.scrambleSets),
    })),
  })),
});

export const internalWcifToResultsJson = (wcif, version) => ({
  formatVersion: 'WCA Competition 0.3',
  competitionId: wcif.id,
  persons: wcif.persons.map(p => ({
    id: p.registrantId,
    name: p.name,
    wcaId: p.wcaId || '',
    countryId: countryById(p.country).iso2,
    gender: p.gender || '',
    dob: p.birthdate,
  })),
  events: wcif.events.map(e => ({
    eventId: e.id,
    rounds: e.rounds.map(r => ({
      roundId: roundTypeIdForRound(e.rounds.length, r),
      formatId: r.format,
      results: r.results.map(res => ({
        personId: res.personId,
        position: res.ranking,
        results: res.attempts.map(a => a.result),
        best: res.best,
        average: res.average,
      })),
      groups: WcifScramblesToResultsGroups(
        internalScramblesToWcifScrambles(e.id, r.scrambleSets)
      ),
    })),
  })),
  // TODO: make sure that only one tnoodle was used, then add an explicit field for that?
  scrambleProgram: wcif.scrambleProgram,
  resultsProgram: `Scrambles Matcher ${version}`,
});

export const competitionLink = id =>
  `https://www.worldcubeassociation.org/competitions/${id}`;

export const competitionHasValidScrambles = wcif =>
  wcif.events.every(e => eventHasValidScrambles(e));

export const eventHasValidScrambles = event =>
  event.rounds.every(r => roundHasValidScrambles(event.id, r));

export const roundHasValidScrambles = (eventId, round) =>
  // Just taking eventId to avoid some splitting of round.id
  ['333mbf', '333fm'].includes(eventId)
    ? Object.keys(groupBy(round.scrambleSets, s => s.attemptNumber)).length ===
      formatById(round.format).solveCount
    : round.scrambleSets.length !== 0;
