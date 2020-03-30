import {Context, Handler} from "aws-lambda";
import {ApiResponse, failure, success} from "./libs/response-lib";
import {calculateCost} from "./libs/billing-lib";
import Stripe from "stripe";

export const handler:Handler<ApiResponse> = async (event: any, ctx: Context): Promise<ApiResponse> => {
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = "Scratch charge";

  // Load our secret key from the  environment variables
  const stripe = new Stripe(process.env.stripeSecretKey!, {
    apiVersion: '2020-03-02',
    typescript: true,
    maxNetworkRetries: 1,
    timeout: 1000,
  });

  try {
    await stripe.charges.create({
      source,
      amount,
      description,
      currency: "usd"
    });
    return success({ status: true });
  } catch (e) {
    return failure({ message: e.message });
  }};