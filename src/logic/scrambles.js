import { flatMap, updateIn, groupBy, sortBy } from "./utils";
import { parseActivityCode } from "./wcif";
import { getUniqueScrambleSetId, importWcif } from "./import-export-wcif";
import { formatById } from "./formats";
import { eventNameById } from "./events";

// The WCIF defines the following fields:
// { id, scrambles: [], extraScrambles: [] }
// Internally we want to store a couple more information:
// {
//   sheetName: String, title: String, generatedAttemptNumber: null|Integer,
//   eventId: String, roundNumber: Integer
// }
// This will let us easily (automatically) match and display scrambles in the WCIF.
// Keeping in mind we'll need to support loading scrambles from the uploaded WCIF!
const tnoodleSheetsToInternal = (filename, sheets) =>
  sheets.map((sheet) => ({
    id: getUniqueScrambleSetId(),
    scrambles: sheet.scrambles || [],
    extraScrambles: sheet.extraScrambles || [],
    title: sheet.title,
    sheetName: filename,
    generatedAttemptNumber: sheet.generatedAttemptNumber,
    eventId: sheet.event,
    roundNumber: sheet.round,
  }));

export const wcifScrambleToInternal = (
  eventId,
  roundNumber,
  sheetName,
  set,
  index
) => ({
  id: getUniqueScrambleSetId(),
  scrambles: set.scrambles || [],
  extraScrambles: set.extraScrambles || [],
  title: `${eventNameById(
    eventId
  )} - Round ${roundNumber} - Set ${prefixForIndex(index)}`,
  sheetName: sheetName,
  eventId: eventId,
  roundNumber: roundNumber,
});

export const splitMultiFmAsWcif = (set) => {
  let attemptNumber = 1;
  // Split the scramble to have one object per attempt (will be useful later ;))
  return set.scrambles.map((sequence) => ({
    ...set,
    id: getUniqueScrambleSetId(),
    scrambles: [sequence],
    title: `${set.title} Attempt ${attemptNumber}`,
    attemptNumber: attemptNumber,
    generatedAttemptNumber: attemptNumber++,
  }));
};

const splitMultiFm = (scramble) => {
  let attemptNumber = 1;
  // Split the scramble to have one object per attempt (will be useful later ;))
  return scramble.scrambles.map((sequence) => ({
    ...scramble,
    scrambles: [sequence],
    title: `${scramble.title} Attempt ${attemptNumber}`,
    scrambleSetId: `${scramble.scrambleSetId}-a${attemptNumber}`,
    generatedAttemptNumber: attemptNumber++,
  }));
};

const scrambleSetsForRound = (usedScramblesId, round, uploadedScrambles) => {
  // We don't want to overwrite existing scrambles,
  // so for all rounds *without* scramble we:
  //   - for all scramble in uploadedScrambles (in order they were uploaded):
  //     - look for a set of matching (event, round number)
  // This way if we ever upload multiple sets of scramble for the same round
  // we just assign the first one (as the others are likely extra scrambles used
  // in rounds we can't figure out programatically !).
  // We also want to return a new WCIF as the wcif passed is most likely taken
  // from a React state.
  const { eventId, roundNumber } = parseActivityCode(round.id);
  let firstMatchingSheets = [];
  uploadedScrambles.find((up) => {
    firstMatchingSheets = up.sheets.filter(
      (s) =>
        !usedScramblesId.includes(s.id) &&
        s.eventId === eventId &&
        s.roundNumber === roundNumber
    );
    return firstMatchingSheets.length !== 0;
  });
  // We don't actually need to update the usedScramblesId, because we never try to
  // get the same eventId/roundNumber again, so usedScramblesId only need to
  // contain the scrambles in use before the autoAssign thing.
  if (["333fm", "333mbf"].includes(eventId)) {
    // Select scrambles which match the attempt number(s) expected,
    // and assign the attemptNumber from the generated number
    let numberOfAttempts = formatById(round.format).solveCount;
    return firstMatchingSheets
      .filter((s) => s.generatedAttemptNumber <= numberOfAttempts)
      .map((s) => ({
        ...s,
        attemptNumber: s.generatedAttemptNumber,
      }));
  } else {
    // Only auto-assign up to scrambleSetCount sets of scrambles.
    return firstMatchingSheets.slice(0, round.scrambleSetCount);
  }
};

export const allScramblesForEvent = (scrambles, eventId, usedIds) =>
  flatMap(scrambles, (scramble) =>
    scramble.sheets.filter(
      (s) => s.eventId === eventId && !usedIds.includes(s.id)
    )
  );

export const usedScramblesIdsForEvent = (events, eventId) =>
  flatMap(
    flatMap(
      events.filter((e) => e.id === eventId),
      (e) => flatMap(e.rounds, (r) => r.scrambleSets)
    ),
    (s) => s.id
  );

export const updateMultiAndFm = (scrambles) =>
  flatMap(scrambles, (s) =>
    s.event === "333fm" || s.event === "333mbf" ? splitMultiFm(s) : s
  );

export const transformUploadedScrambles = (uploadedJson) => {
  // Newer versions of TNoodle provide a pre-compiled WCIF that we can read here.
  // Retain old version (`else` branch) as well to have a "grace period" in transitioning
  if ("wcif" in uploadedJson) {
    const tnoodleWcif = uploadedJson["wcif"];
    const [, extractedScrambles] = importWcif(tnoodleWcif);
    delete uploadedJson["wcif"]; // avoid confusion with the other WCIF that gets merged in
    uploadedJson["sheets"] = extractedScrambles.flatMap(
      (sheetExt) => sheetExt["sheets"]
    );
    return uploadedJson;
  } else {
    const updater = (sheets) =>
      tnoodleSheetsToInternal(
        uploadedJson.competitionName,
        updateMultiAndFm(sheets)
      );
    return updateIn(uploadedJson, ["sheets"], updater);
  }
};

// 65 is the char code for 'A'
export const prefixForIndex = (index) => {
  let prefix = "";

  while (index >= 0) {
    const remainder = index % 26;
    prefix = String.fromCharCode(65 + remainder) + prefix;
    index = Math.floor(index / 26) - 1;
  }

  return prefix;
};

export const internalScramblesToWcifScrambles = (eventId, scrambles) => {
  if (scrambles.length === 0) return scrambles;
  if (eventId === "333mbf") {
    // For all attempts, we want to push each of the scramble sequences to
    // their corresponding groups.
    let scramblesByAttempt = groupBy(scrambles, (s) => s.attemptNumber);
    let sheets = [];
    Object.keys(scramblesByAttempt)
      .sort()
      .forEach((number) =>
        scramblesByAttempt[number].forEach((sheet, groupIndex) => {
          if (groupIndex >= sheets.length) {
            // Create a sheet for group
            sheets.push({
              id: sheet.id,
              scrambles: [...sheet.scrambles],
              extraScrambles: [],
            });
          } else {
            // Push the attempt to the group
            sheets[groupIndex].scrambles.push(...sheet.scrambles);
          }
        })
      );
    return sheets;
  } else if (eventId === "333fm") {
    // We can't track yet in the WCIF which scramble was for witch attempt,
    // so let's just sort them by attempt id and combine them in one
    // scramble sheet.
    // There is usually only one group for FM, the only case where we would
    // like more scramble than expected is when something terrible happened
    // and an extra was needed.
    return [
      {
        id: scrambles[0].id,
        scrambles: flatMap(
          sortBy(scrambles, (s) => s.attemptNumber),
          (s) => s.scrambles
        ),
        extraScrambles: [],
      },
    ];
  }
  return scrambles.map((set) => ({
    id: set.id,
    scrambles: set.scrambles,
    extraScrambles: set.extraScrambles,
  }));
};

export const autoAssignScrambles = (wcif, uploadedScrambles) => {
  let usedScrambleIdsByEvent = {};
  wcif.events.forEach((e) => {
    usedScrambleIdsByEvent[e.id] = usedScramblesIdsForEvent(wcif.events, e.id);
  });
  return {
    ...wcif,
    events: wcif.events.map((e) => ({
      ...e,
      rounds: e.rounds.map((r) => ({
        ...r,
        scrambleSets:
          r.scrambleSets.length === 0
            ? scrambleSetsForRound(
                usedScrambleIdsByEvent[e.id],
                r,
                uploadedScrambles
              )
            : r.scrambleSets,
      })),
    })),
  };
};

export const clearScrambles = (wcif) => ({
  ...wcif,
  events: wcif.events.map((e) => ({
    ...e,
    rounds: e.rounds.map((r) => ({
      ...r,
      scrambleSets: [],
    })),
  })),
});

export const scramblesToResultsGroups = (scrambles) =>
  scrambles.map((sheet, index) => ({
    group: prefixForIndex(index),
    scrambles: sheet.scrambles,
    extraScrambles: sheet.extraScrambles || [],
  }));
