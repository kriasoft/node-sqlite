export * from "./Statement.js";
export * from "./Database.js";
import Database from "./Database.js";

/**
 * Opens a database for manipulation. Most users will call this to get started.
 */
export async function open(config) {
  const db = new Database.Database(config);
  await db.open();
  return db;
}
