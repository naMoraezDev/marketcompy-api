import app from "./app";
import { normalize } from "path";

const port = Number(normalize(process.env.PORT || "3333"));

app.listen({ host: "0.0.0.0", port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
