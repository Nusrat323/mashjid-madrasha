import Event from "../models/Event.js";
import createCrudRouter from "./createCrudRouter.js";

export default createCrudRouter(Event, { date: 1 });
