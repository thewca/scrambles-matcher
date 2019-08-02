import { flatMap, updateIn } from './utils';

let uniqueScrambleSetId = 1;

// The WCIF defines the following fields:
// { id, scrambles: [], extraScrambles: [] }
// Internally we want to store a couple more information:
// {
//   sheetName: String, title: String, generatedAttemptNumber: null|Integer,
//   eventId: String, roundNumber: Integer
// }
// This will let us easily (automatically) match and display scrambles in the WCIF.
// Keeping in mind we'll need to support loading scrambles from the uploaded WCIF!
const tnoodleSheetsToInternal = (filename, sheets) => sheets.map(sheet => {
    return {
      id: uniqueScrambleSetId++,
      scrambles: sheet.scrambles || [],
      extraScrambles: sheet.extraScrambles || [],
      title: sheet.title,
      sheetName: filename,
      generatedAttemptNumber: sheet.generatedAttemptNumber,
      eventId: sheet.event,
      roundNumber: sheet.round,
    }
});

const splitMultiFm = scramble => {
  let attemptNumber = 1;
  // Split the scramble to have one object per attempt (will be useful later ;))
  return scramble.scrambles.map(sequence => { return {
    ...scramble,
    scrambles: [sequence],
    title: `${scramble.title} Attempt ${attemptNumber}`,
    scrambleSetId: `${scramble.scrambleSetId}-a${attemptNumber}`,
    generatedAttemptNumber: attemptNumber++,
  }});
}

const addScrambleSetsIfMissing = rounds => rounds.map(r => {
  return {
    ...r,
    scrambleSets: r.scrambleSets || [],
  }
});

export const allScramblesForEvent = (scrambles, eventId, usedIds) =>
  flatMap(scrambles, scramble => scramble.sheets.filter(s => (s.eventId === eventId && !usedIds.includes(s.id))));

export const usedScramblesIdsForEvent = (events, eventId) =>
  flatMap(flatMap(events.filter(e => e.id === eventId), e => flatMap(e.rounds, r => r.scrambleSets)), s => s.id);

export const updateMultiAndFm = scrambles => flatMap(scrambles, s => (s.event === "333fm" || s.event === "333mbf") ? splitMultiFm(s) : s)

export const ensureScramblesMember = events => events.map(e => updateIn(e, ["rounds"], addScrambleSetsIfMissing));

export const transformUploadedScrambles = uploadedJson => {
  const updater = sheets => tnoodleSheetsToInternal(uploadedJson.competitionName, sheets);
  return updateIn(uploadedJson, ["sheets"], updater);
};
