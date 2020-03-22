import { Sqlite3, SqlObj } from '../interfaces/Sqlite3.interfaces'

export function toSqlParams (sql: Sqlite3.SqlType, params: any[] = []): SqlObj {
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
