"use server";

import { signupSchema, type SignupFormValues } from "~/schemas/auth";
import { db } from "~/server/db";
import { hashPassword } from "~/lib/auth";
import Stripe from "stripe";
import { env } from "~/env";

type SignupResult = {
  success: boolean;
  error?: string;
};

export async function signUp(data: SignupFormValues): Promise<SignupResult> {
  const validationResult = signupSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      error: validationResult.error.issues[0]?.message ?? "Invalid form data",
    };
  }

  const { email, password } = validationResult.data;

  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        error: "Email already exists!",
      };
    }

    const hashedPassword = await hashPassword(password);

    const stripe = new Stripe(env.STRIPE_SECRET_KEY);

    const stripeCustomer = await stripe.customers.create({
      email: email.toLowerCase(),
    });

    await db.user.create({
      data: {
        email,
        password: hashedPassword,
        stripeCustomerId: stripeCustomer.id,
      },
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: "An error occurred while signing up",
    };
  }
}
