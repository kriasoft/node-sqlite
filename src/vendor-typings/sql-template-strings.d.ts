declare module 'sql-template-strings' {
  export class SQLStatement {
    private strings: string[]

    /**
     * The SQL Statement for [node-postgres](https://www.npmjs.com/package/pg)
     */
    text: string

    /**
     * The SQL Statement for [Sequelize](https://www.npmjs.com/package/sequelize)
     */
    query: string

    /**
     * The SQL Statement for [mysql](https://www.npmjs.com/package/mysql)
     */
    sql: string

    /**
     * The values to be inserted for the placeholders
     */
    values: any[]

    /**
     * The name for postgres prepared statements, if set
     */
    name: string

    /**
     * Appends a string or another statement
     *
     * ```ts
     * query.append(SQL`AND genre = ${genre}`).append(' ORDER BY rating')
     * query.text   // => 'SELECT author FROM books WHERE name = $1 AND author = $2 AND genre = $3 ORDER BY rating'
     * query.sql    // => 'SELECT author FROM books WHERE name = ? AND author = ? AND genre = ? ORDER BY rating'
     * query.values // => ['harry potter', 'J. K. Rowling', 'Fantasy'] ORDER BY rating`
     *
     * const query = SQL`SELECT * FROM books`
     * if (params.name) {
     *   query.append(SQL` WHERE name = ${params.name}`)
     * }
     * query.append(SQL` LIMIT 10 OFFSET ${params.offset || 0}`)
     * ```
     */
    append (statement: SQLStatement | string | number): this

    /**
     * Sets the name property of this statement for prepared statements in postgres
     *
     * ```ts
     * pg.query(SQL`SELECT author FROM books WHERE name = ${book}`.setName('my_query'))
     * ```
     */
    setName (name: string): this

    /**
     * Use a prepared statement with Sequelize.
     * Makes `query` return a query with `$n` syntax instead of `?`  and switches the `values` key name to `bind`
     * If omitted, `value` defaults to `true`.
     */
    useBind (value?: boolean): this
  }

  /**
   * The template string tag
   *
   * ```ts
   * import {SQL} from 'sql-template-strings';
   *
   * pg.query(SQL`SELECT author FROM books WHERE name = ${book} AND author = ${author}`)
   * ```
   */
  export function SQL (strings: any, ...values: any[]): SQLStatement
  export default SQL
}
