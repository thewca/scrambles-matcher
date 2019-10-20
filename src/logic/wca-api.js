import { WCA_ORIGIN } from './wca-env';

export const getUpcomingManageableCompetitions = userToken => {
  const oneMonthAgo = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000);
  const params = new URLSearchParams({
    managed_by_me: true,
    start: oneMonthAgo.toISOString(),
  });
  return wcaApiFetch(userToken, `/competitions?${params.toString()}`);
};

export const getWcif = (userToken, competitionId) =>
  wcaApiFetch(userToken, `/competitions/${competitionId}/wcif`);

export const getMe = userToken => wcaApiFetch(userToken, `/me`);

const wcaApiFetch = (userToken, path, fetchOptions = {}) => {
  const baseApiUrl = `${WCA_ORIGIN}/api/v0`;

  return fetch(
    `${baseApiUrl}${path}`,
    Object.assign({}, fetchOptions, {
      headers: new Headers({
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      }),
    })
  )
    .then(response => {
      if (!response.ok) throw new Error(response.statusText);
      return response;
    })
    .then(response => response.json());
};
