import { app } from "./app.js";
import { config } from "./config.js";
import { initStore } from "./store.js";

initStore()
  .then(() => {
    app.listen(config.PORT, () =>
      console.log(`GigFlow API listening on ${config.PORT}`)
    );
  })
  .catch((error) => {
    console.error("Failed to initialize GigFlow store", error);
    process.exit(1);
  });
