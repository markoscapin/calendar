// db.js
import Dexie from "dexie";

export const db = new Dexie("calendar_client_db");

db.version(1).stores({
  events: "++id, title, description, start, end",
});



