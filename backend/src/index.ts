import { Elysia } from "elysia";
import statusRoutes from "./routes/master-status-routes";

const app = new Elysia()
.get("/", () => "Hello Elysia")
.use(statusRoutes)
.listen(2501);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
