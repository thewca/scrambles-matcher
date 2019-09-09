import { formatById } from './formats';
import { groupBy } from './utils';
import { countryById } from './countries';

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

export const registrantIdFromAttributes = (persons, name, countryId, wcaId) =>
  persons.find(
    p =>
      p.name === name &&
      p.countryIso2 === countryById(countryId).iso2 &&
      p.wcaId === wcaId
  ).registrantId;

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
