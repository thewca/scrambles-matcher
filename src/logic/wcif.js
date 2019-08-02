import { groupBy, flatMap, sortBy } from './utils';

// TODO: implement a proper "allScramblePresent" function
// For attempt-based event (mbf, fm), we should not only check that we have one scramble,
// but one scramble for each attempt.

export const eventIdFromRound = round => round.id.split("-")[0];

export const internalWcifToWcif = wcif => {
  console.log(wcif);
  // We only alter the scrambles, so make them right wrt the WCIF.
  return {
    ...wcif,
    events: wcif.events.map(e => {
      return {
        ...e,
        rounds: e.rounds.map(r => {
          if (r.scrambleSets.length === 0)
            return r;
          if (e.id === "333mbf") {
            // We need to combine all scrambles for each attempt,
            // in the end there will be one scramble sheet with X scramble sequences,
            // where X is the number of attempts.
            let scramblesByAttempt = groupBy(r.scrambleSets, s => s.attemptNumber);
            let sheet = {
              id: r.scrambleSets[0].id,
              scrambles: [],
              extraScrambles: [],
            }
            Object.keys(scramblesByAttempt).sort().forEach(number =>
              sheet.scrambles.push(scramblesByAttempt[number].map(s => s.scrambles).join("\n")));
            return {
              ...r,
              scrambleSets: [sheet],
            }
          } else if (e.id === "333fm") {
            // We can't track yet in the WCIF which scramble was for witch attempt,
            // so let's just sort them by attempt id and combine them in one
            // scramble sheet.
            // There is usually only one group for FM, the only case where we would
            // like more scramble than expected is when something terrible happened
            // and an extra was needed.
            return {
              ...r,
              scrambleSets: [{
                id: r.scrambleSets[0].id,
                scrambles: flatMap(sortBy(r.scrambleSets, s => s.attemptNumber), s => s.scrambles),
                extraScrambles: [],
              }],
            }
          }
          return {
            ...r,
            scrambleSets: r.scrambleSets.map(set => {
              return {
                id: set.id,
                scrambles: set.scrambles,
                extraScrambles: set.extraScrambles,
              }
            }),
          };
        }),
      };
    }),
  }
};
