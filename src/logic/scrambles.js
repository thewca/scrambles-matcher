import { flatMap, updateIn } from './utils';

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

export const updateMultiAndFm = scrambles => flatMap(scrambles, s => (s.event === "333fm" || s.event === "333mbf") ? splitMultiFm(s) : s)

const addScrambleSetsIfMissing = rounds => rounds.map(r => {
  return {
    ...r,
    scrambleSets: r.scrambleSets || [],
  }
});

export const ensureScramblesMember = events => events.map(e => updateIn(e, ["rounds"], addScrambleSetsIfMissing));
