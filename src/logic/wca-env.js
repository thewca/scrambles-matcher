export const PRODUCTION = process.env.NODE_ENV === 'production';

export const WCA_ORIGIN = PRODUCTION
  ? 'https://www.worldcubeassociation.org'
  : 'https://staging.worldcubeassociation.org';

export const WCA_OAUTH_CLIENT_ID = PRODUCTION
  ? 'LdjkJPQlw4H19jf2HvCwIKk-ia1Ay_ExAFT0BlEy5Ts'
  : 'example-application-id';
