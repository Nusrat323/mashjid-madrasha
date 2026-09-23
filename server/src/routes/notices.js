import Notice from "../models/Notice.js";
import createCrudRouter from "./createCrudRouter.js";

export default createCrudRouter(Notice, { createdAt: -1 });
