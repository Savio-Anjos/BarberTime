import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { fastifyCors } from "@fastify/cors";

export const app = fastify();

app.register(fastifyCors, {
  origin: "*",
});

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  reply.status(500).send({ message: "Internal server error." });
});

app.get("/", async (req, res) => {
  res.send("Welcome to the BarberTime API");
});
