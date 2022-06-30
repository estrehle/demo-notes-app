import { Stripe } from 'stripe';
import { env } from '../../util/env';
import { BillingReqDto } from '../models/billing.req.dto';
import { calculateCost } from '../util/cost';
import { handler } from '../util/handler';

export const main = handler(async (event) => {
  const body = event.body;
  if (body === undefined) throw new Error('missing body');
  const { storage, source } = JSON.parse(body) as BillingReqDto;
  const amount = calculateCost(storage);
  const description = 'Scratch charge';

  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
  });

  await stripe.charges.create({
    amount,
    currency: 'usd',
    description,
    source,
  });

  return { status: true };
});
