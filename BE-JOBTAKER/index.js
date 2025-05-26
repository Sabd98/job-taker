
import bodyParser from 'body-parser';
import express from 'express';
import sequelize from './utils/db.js';
import { jobRouter } from "./controllers/jobs.js";
import dotenv from "dotenv";
import morgan from 'morgan';
import cors from "cors";
import { Request } from './models/Request.js';
// import { User } from './models/User.js';
import { Job } from './models/Job.js';
import { requestRouter } from './controllers/requests.js';
import { User } from './models/User.js';
import { authRouter } from './controllers/auth.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static('public'));

// Associations
User.hasMany(Request, { foreignKey: 'userId' });
Request.belongsTo(User, { foreignKey: 'userId' });
Request.belongsTo(Job, { foreignKey: "jobId" });
Job.hasMany(Request, { foreignKey: "jobId" });
Job.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Request, { foreignKey: "userId" });

app.use(jobRouter);
app.use(requestRouter);
app.use(authRouter);


app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  res.status(404).json({ message: 'Not found' });
});

sequelize
.sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
