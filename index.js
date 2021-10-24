import fetch from "node-fetch";
import dotenv from "dotenv";
import events from "./webhook.js";

dotenv.config();

const run = async () => {
  for (let i = 0; i < events.length; i++) {
    const event = events[i];

    const post = await fetch(process.env.DISCORD_WEBHOOK_URI, {
      method: "POST",
      body: JSON.stringify(event),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(post);
  }
};

run();
