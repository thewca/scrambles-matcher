import { sortBy } from './utils';
import { parseActivityCode } from './wcif';
import { roundTypeById } from './roundtypes';

const events = [
  { id: '333', name: '3x3x3 Cube', shortName: '3x3' },
  { id: '222', name: '2x2x2 Cube', shortName: '2x2' },
  { id: '444', name: '4x4x4 Cube', shortName: '4x4' },
  { id: '555', name: '5x5x5 Cube', shortName: '5x5' },
  { id: '666', name: '6x6x6 Cube', shortName: '6x6' },
  { id: '777', name: '7x7x7 Cube', shortName: '7x7' },
  { id: '333bf', name: '3x3x3 Blindfolded', shortName: '3BLD' },
  { id: '333fm', name: '3x3x3 Fewest Moves', shortName: 'FMC' },
  { id: '333oh', name: '3x3x3 One-Handed', shortName: '3OH' },
  { id: '333ft', name: '3x3x3 With Feet', shortName: '3WF' },
  { id: 'minx', name: 'Megaminx', shortName: 'Minx' },
  { id: 'pyram', name: 'Pyraminx', shortName: 'Pyra' },
  { id: 'clock', name: 'Clock', shortName: 'Clock' },
  { id: 'skewb', name: 'Skewb', shortName: 'Skewb' },
  { id: 'sq1', name: 'Square-1', shortName: 'Sq1' },
  { id: '444bf', name: '4x4x4 Blindfolded', shortName: '4BLD' },
  { id: '555bf', name: '5x5x5 Blindfolded', shortName: '5BLD' },
  { id: '333mbf', name: '3x3x3 Multi-Blind', shortName: 'MBLD' },
];

export const eventNameById = eventId => propertyById('name', eventId);

export const shortEventNameById = eventId => propertyById('shortName', eventId);

const propertyById = (property, eventId) =>
  events.find(event => event.id === eventId)[property];

export const sortWcifEvents = wcifEvents =>
  sortBy(wcifEvents, wcifEvent =>
    events.findIndex(event => event.id === wcifEvent.id)
  );

export const roundTypeIdForRound = (numberOfRounds, round) => {
  // This is the case if we loaded a XLSX!
  if (round.roundTypeId) return round.roundTypeId;

  let { roundNumber } = parseActivityCode(round.id);
  if (roundNumber === numberOfRounds) {
    return round.cutoff ? 'c' : 'f';
  }
  if (roundNumber === 1) {
    return round.cutoff ? 'd' : '1';
  }
  if (roundNumber === 2) {
    return round.cutoff ? 'e' : '2';
  }
  if (roundNumber === 3) {
    return round.cutoff ? 'g' : '3';
  }
  return '<oops>';
};

export const roundName = (numberOfRounds, round) => {
  let { eventId } = parseActivityCode(round.id);
  return `${eventNameById(eventId)} - ${
    roundTypeById(roundTypeIdForRound(numberOfRounds, round)).name
  }`;
};
