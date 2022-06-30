/* eslint-disable @typescript-eslint/no-non-null-assertion */

export const env = {
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
  TABLE_NAME: process.env.TABLE_NAME || '',
};
