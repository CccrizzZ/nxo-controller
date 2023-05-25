import dotenv from "dotenv"

export const envs = {
  ...process.env,
  ...dotenv.config().parsed
};

console.log(process.env.NODE_ENV)
export const isProduction = process.env.NODE_ENV === "production";
