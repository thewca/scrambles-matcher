import { registrantIdFromAttributes } from './wcif';
import { timeToValue } from './results';

const formatStringToId = {
  "Format: best of 1": "1",
  "Format: best of 2": "2",
  "Format: best of 3": "3",
  "Format: mean of 3": "m",
  "Format: average of 5": "a",
};

const expectedNumberOfAttemptsByFormat = {
  "1": 1,
  "2": 2,
  "3": 3,
  "m": 3,
  "a": 5,
};

// First two rows contain the competition name and irrelevant information.
// Third row is these headers
//["#", "Name", "Country", "WCA id", "Gender", "Date of birth", ...]
export const personWcifFromRegistrationXlsx = sheet =>
  sheet.splice(0, 3) && sheet.map(person => {
    return {
      registrantId: parseInt(person[0]),
      name: person[1],
      wcaUserId: null,
      country: person[2],
      wcaId: person[3] || null,
      gender: person[4],
      birthdate: person[5],
      // We actually don't need to fill this to post results.
      registration: {},
      email: null,
      avatar: null,
      roles: [],
      assignments: [],
      personalBests: [],
    };
  });

const attemptsFromResultRow = (eventId, formatId, row) => {
  let maxAttempts = expectedNumberOfAttemptsByFormat[formatId];
  // TODO: for FMC parse move
  if (eventId === "333mbf") {
    return [...Array(maxAttempts).keys()].map(index => {
      return {
        // For MBF there is a 4 column offset for the person,
        // then each result takes 4 columns.
        result: parseInt(row[7 + index*4]),
      }
    });
  } else {
    let attempts = row.slice(4, 4 + maxAttempts).filter(a => a).map(a => {
      return {
        result: timeToValue(a),
      };
    });
    // Fillup to expected number of attempts.
    // Not necessary but useful to export to results JSON.
    while (attempts.length !== maxAttempts)
      attempts.push({ result: 0 });
    return attempts;
  }
};

const bestForRow = (eventId, formatId, row) => {
  let maxAttempts = expectedNumberOfAttemptsByFormat[formatId];
  return eventId === "333mbf"
    ? parseInt(row[4 + maxAttempts*4])
    : timeToValue(row[4 + maxAttempts]);
};

const avgForRow = (eventId, formatId, row) => {
  if (eventId === "333mbf")
    return 0;
  // also get the average for the best of 3 format:
  // the only events which can use it are 3bf, 4bf, 5bf, and 3mbf.
  // Except for 3mbf, we recognize the average.
  if (["3", "m", "a"].includes(formatId)) {
    let maxAttempts = expectedNumberOfAttemptsByFormat[formatId];
    if (formatId === "a") {
      // 5 would return the WR marker for the best.
      // 6 would return the worst.
      return timeToValue(row[7 + maxAttempts]);
    } else {
      // 5 would return the WR marker for the best.
      return timeToValue(row[6 + maxAttempts]);
    }
  }

  return 0;
};


// First row: round name
// Second row: format name
// Third row: time format
// Fourth row:
//   ["Position", "Name", "Country", "WCA id", "1", "2", "3", "4", "5", "Best", "WR", "Worst", "Average", "WR"]
// or for multi:
//   ["Position", "Name", "Country", "WCA id", "tried", "solved", "seconds", "score 1", "WR"]
export const roundWcifFromXlsx = (persons, eventId, roundNumber, sheet) => {
  let roundFormat = formatStringToId[sheet[1][0]];
  sheet.splice(0, 4);
  return {
    advancementCondition: null,
    id: `${eventId}-r${roundNumber}`,
    cutoff: null,
    format: roundFormat,
    results: sheet.map(row => {
      return {
        ranking: parseInt(row[0]),
        personId: registrantIdFromAttributes(persons, row[1], row[2], row[3] || null),
        attempts: attemptsFromResultRow(eventId, roundFormat, row),
        // these are *not* in the WCIF, but will make our life easier to export
        // to results json!
        best: bestForRow(eventId, roundFormat, row),
        average: avgForRow(eventId, roundFormat, row),
      };
    }),
    scrambleSetCount: 0,
    scrambleSets: [],
    timeLimit: null,
  };
};
