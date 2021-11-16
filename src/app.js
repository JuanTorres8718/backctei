import express from "express";
import cors from "cors";
import projectsRoutes from "./routes/projects.routes";
import talentsRoutes from "./routes/talents.routes";
import maquinaryRoutes from "./routes/maquinary.routes";
import productsRoutes from "./routes/products.routes";
import usersRoutes from "./routes/users.routes";
import tablesRoutes from "./routes/table_secundary.routes";

const app = express();
const dotenv = require("dotenv");

dotenv.config();
//settigns
app.set("port", process.env.PORT || 3000);
app.use(cors());

//middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(usersRoutes);
app.use(tablesRoutes);
app.use(projectsRoutes);
app.use(talentsRoutes);
app.use(maquinaryRoutes);
app.use(productsRoutes);

export default app;
