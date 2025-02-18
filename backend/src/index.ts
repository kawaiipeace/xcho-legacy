import { Elysia } from "elysia";
import sequelize from "./database";
import { history } from "../db-models/history";
import statusRoutes from "./routes/master_status_routes";
import surveyRoutes from "./routes/surveys_routes";
import assigneeRoutes from "./routes/assignee_routes";
import { master_status } from "../db-models/master_status";
import { survey } from "../db-models/survey";
import { assignees } from "../db-models/assignees";
import { results } from "../db-models/results";
import resultRoutes from "./routes/result_routes";
import cors from "@elysiajs/cors";
import departmentRoutes from "./routes/master_department_routes";
import { swagger } from '@elysiajs/swagger';
import { master_department } from "../db-models/master_department";
import { mock_user_data } from "../db-models/mock_user_data";
import userDataRoutes from "./routes/user_data_routes";

history.initModel(sequelize);
master_status.initModel(sequelize);
survey.initModel(sequelize);
assignees.initModel(sequelize);
results.initModel(sequelize);
master_department.initModel(sequelize);
mock_user_data.initModel(sequelize);

const app = new Elysia()
.use(cors({
  origin: '*',
  methods: ['GET','POST'],
}))
.use(statusRoutes)
.use(surveyRoutes)
.use(assigneeRoutes)
.use(resultRoutes)
.use(departmentRoutes)
.use(userDataRoutes)
.use(swagger()) // Enable Swagger UI
.listen(2501);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
