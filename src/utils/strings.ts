import { ISqlite } from '../interfaces'

/**
 * Allows for using strings and `sql-template-strings`. Converts both to a
 * format that's usable by the SQL methods
 *
 * @param sql A SQL string or `sql-template-strings` object
 * @param params An array of parameters
 */
export function toSqlParams (
  sql: ISqlite.SqlType,
  params: any[] = []
): ISqlite.SqlObj {
  if (typeof sql === 'string') {
    return {
      sql,
      params
    }
  }

  return {
    sql: sql.sql,
    params: sql.values
  }
}
