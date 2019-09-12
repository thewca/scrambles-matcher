import { WCA_ORIGIN, WCA_OAUTH_CLIENT_ID } from './wca-env';

/**
 * Checks the URL hash for presence of OAuth access token
 * and return it if it's found.
 * Should be called on application initialization (before any kind of router takes over the location).
 */
export const getOauthTokenIfAny = () => {
  const hash = window.location.hash.replace(/^#/, '');
  const hashParams = new URLSearchParams(hash);
  if (hashParams.has('access_token')) {
    window.location.hash = '';
    return hashParams.get('access_token');
  }
  return null;
};

export const signIn = () => {
  const params = new URLSearchParams({
    client_id: WCA_OAUTH_CLIENT_ID,
    response_type: 'token',
    redirect_uri: oauthRedirectUri(),
    scope: 'public manage_competitions',
  });
  window.location = `${WCA_ORIGIN}/oauth/authorize?${params.toString()}`;
};

const oauthRedirectUri = () => {
  const appUri = window.location.origin;
  const searchParams = new URLSearchParams(window.location.search);
  const stagingParam = searchParams.has('staging');
  return stagingParam ? `${appUri}?staging=true` : appUri;
};
