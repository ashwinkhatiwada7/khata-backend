import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db"; // your db instance
import { admin, bearer } from "better-auth/plugins";
import { expo } from "@better-auth/expo";
import * as schema from "../db/schema";
export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,

  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: false,
    autoSignIn: true,
  },
  user: {
    additionalFields: {
      shopName: {
        type: "string",
        required: false,
        input: false,
      },
      location: {
        type: "string",
        required: false,
        input: false,
      },
      phone: {
        type: "string",
        required: true,
        input: true,
      },
    },
  },
  plugins: [admin(), expo(), bearer()],
  trustedOrigins: [
    "khata://", // app.json "scheme"
    "khata://*",
    ...(process.env.NODE_ENV !== "production"
      ? ["exp://", "exp://**", "exp://192.168.*.*:*/**"] // Expo Go / dev
      : []),
  ],
});

export type BetterUser = typeof auth.$Infer.Session.user;

console.log("test");
