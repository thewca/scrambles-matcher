import { flatMap } from './utils';
import wca_states from '../wca_data/wca-states.json';

const countries = flatMap(wca_states.states_lists, list => list.states);

export const countryByIso2 = iso2 =>
  countries.find(country => country.iso2 === iso2);

export const countryById = id => countries.find(country => country.id === id);
