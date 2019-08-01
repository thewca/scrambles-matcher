import { flatMap } from './utils';

const splitMultiFm = scramble => {
  let attemptNumber = 1;
  // Split the scramble to have one object per attempt (will be useful later ;))
  return scramble.scrambles.map(sequence => { return {
    ...scramble,
    scrambles: [sequence],
    title: `${scramble.title} Attempt ${attemptNumber}`,
    attemptNumber: attemptNumber++,
  }});
}

export const updateMultiAndFm = scrambles => flatMap(scrambles, s => (s.event === "333fm" || s.event === "333mbf") ? splitMultiFm(s) : s)
