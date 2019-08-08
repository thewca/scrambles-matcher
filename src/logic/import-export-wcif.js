import { internalScramblesToWcifScrambles } from './scrambles';
import {
  scramblesToResultsGroups,
  wcifScrambleToInternal,
  splitMultiFmAsWcif,
} from './scrambles';
import { countryById } from './countries';
import { flatMap, updateIn } from './utils';
import { sortWcifEvents, roundTypeIdForRound } from './events';
import { parseActivityCode } from './wcif';

let uniqueScrambleSetId = 1;
let uniqueScrambleUploadedId = 1;

export const getUniqueScrambleSetId = () => uniqueScrambleSetId++;
export const getUniqueScrambleUploadedId = () => uniqueScrambleUploadedId++;

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
      groups: scramblesToResultsGroups(
        internalScramblesToWcifScrambles(e.id, r.scrambleSets)
      ),
    })),
  })),
  // TODO: make sure that only one tnoodle was used, then add an explicit field for that?
  scrambleProgram: wcif.scrambleProgram,
  resultsProgram: `Scrambles Matcher ${version}`,
});

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

export const importWcif = wcif => {
  // Perform a few changes such as sorting the events, and extracting scrambles
  // sheets.

  wcif = updateIn(wcif, ['events'], sortWcifEvents);
  let all = flatMap(
    flatMap(wcif.events, e => e.rounds),
    r => r.scrambleSets || []
  );
  uniqueScrambleSetId =
    all.length === 0 ? 1 : Math.max(...all.map(s => s.id)) + 1;

  let scrambleSheet = {
    id: uniqueScrambleUploadedId,
    competitionName: `${uniqueScrambleUploadedId}: Scrambles for ${wcif.name}`,
    generationUrl: 'unknown',
    generationDate: 'unknown',
    version: 'unknown',
    sheets: [],
  };

  wcif = {
    ...wcif,
    events: wcif.events.map(e => ({
      ...e,
      rounds: e.rounds.map(r => {
        let sheets = (r.scrambleSets || []).map((set, index) => {
          let internalSet = wcifScrambleToInternal(
            e.id,
            parseActivityCode(r.id).roundNumber,
            scrambleSheet.competitionName,
            set,
            index
          );
          if (['333fm', '333mbf'].includes(e.id)) {
            internalSet = splitMultiFmAsWcif(internalSet);
            scrambleSheet.sheets.push(...internalSet);
          } else {
            scrambleSheet.sheets.push(internalSet);
          }
          return internalSet;
        });
        return {
          ...r,
          scrambleSets: flatMap(sheets, s => s),
        };
      }),
    })),
  };
  let extractedSheets = [];
  if (scrambleSheet.sheets.length !== 0) {
    uniqueScrambleUploadedId++;
    extractedSheets.push(scrambleSheet);
  }

  // Return an element to add to "uploadedscrambles", and the processed wcif.
  return [wcif, extractedSheets];
};
