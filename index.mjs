export * from "./build/Statement.js";
export * from "./build/Database.js";
import Database from "./build/Database.js";

/**
 * Opens a database for manipulation. Most users will call this to get started.
 */
export async function open(config) {
  const db = new Database.Database(config);
  await db.open();
  return db;
}
