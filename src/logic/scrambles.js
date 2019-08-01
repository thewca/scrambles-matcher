import { flatMap, updateIn } from './utils';

let uniqueScrambleSetId = 1;

const splitMultiFm = scramble => {
  let attemptNumber = 1;
  // Split the scramble to have one object per attempt (will be useful later ;))
  return scramble.scrambles.map(sequence => { return {
    ...scramble,
    scrambles: [sequence],
    title: `${scramble.title} Attempt ${attemptNumber}`,
    scrambleSetId: `${scramble.scrambleSetId}-a${attemptNumber}`,
    attemptNumber: attemptNumber++,
  }});
}

const addScrambleSetsIfMissing = rounds => rounds.map(r => {
  return {
    ...r,
    scrambleSets: r.scrambleSets || [],
  }
});

export const allScramblesForEvent = (scrambles, eventId, usedIds) =>
  flatMap(scrambles, scramble => scramble.sheets.filter(s => s.event === eventId).map(s => {
    return {
      id: s.id,
      title: s.title,
      sheetName: scramble.competitionName,
    };
  })).filter(item => !usedIds.includes(item.id));

export const assignScrambleSheetId = scrambles => scrambles.map(s => {
  s.id = uniqueScrambleSetId++;
  return s;
});

export const usedScramblesIdsForEvent = (events, eventId) =>
  flatMap(flatMap(events.filter(e => e.id === eventId), e => flatMap(e.rounds, r => r.scrambleSets)), s => s.id);

export const updateMultiAndFm = scrambles => flatMap(scrambles, s => (s.event === "333fm" || s.event === "333mbf") ? splitMultiFm(s) : s)

export const ensureScramblesMember = events => events.map(e => updateIn(e, ["rounds"], addScrambleSetsIfMissing));
