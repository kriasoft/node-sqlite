import { SQLStatement } from "sql-template-strings";

declare module 'sqlite' {
  export interface Statement {
    readonly sql: string;
    readonly lastID: number;
    readonly changes: number;

    bind(): Promise<Statement>;
    bind(...params: any[]): Promise<Statement>;

    reset(): Promise<Statement>;

    finalize(): Promise<void>;

    run(): Promise<Statement>;
    run(...params: any[]): Promise<Statement>;

    get(): Promise<any>;
    get(...params: any[]): Promise<any>;

    get<T>(): Promise<T>;
    get<T>(...params: any[]): Promise<T>;

    all(): Promise<any[]>;
    all(...params: any[]): Promise<any[]>;

    all<T>(): Promise<T[]>;
    all<T>(...params: any[]): Promise<T[]>;

    each(callback?: (err: Error, row: any) => void): Promise<number>;
    each(...params: any[]): Promise<number>;
  }

  export interface Database {
    close(): Promise<void>;

    run(sql: string | SQLStatement): Promise<Statement>;
    run(sql: string | SQLStatement, ...params: any[]): Promise<Statement>;

    get(sql: string | SQLStatement): Promise<any>;
    get(sql: string | SQLStatement, ...params: any[]): Promise<any>;

    get<T>(sql: string | SQLStatement): Promise<T>;
    get<T>(sql: string | SQLStatement, ...params: any[]): Promise<T>;

    all(sql: string | SQLStatement): Promise<any[]>;
    all(sql: string | SQLStatement, ...params: any[]): Promise<any[]>;

    all<T>(sql: string | SQLStatement): Promise<T[]>;
    all<T>(sql: string | SQLStatement, ...params: any[]): Promise<T[]>;

    exec(sql: string): Promise<Database>;

    each(sql: string | SQLStatement, callback?: (err: Error, row: any) => void): Promise<number>;
    each(sql: string | SQLStatement, ...params: any[]): Promise<number>;

    prepare(sql: string | SQLStatement): Promise<Statement>;
    prepare(sql: string | SQLStatement, ...params: any[]): Promise<Statement>;

    configure(option: "busyTimeout", value: number): void;
    configure(option: string, value: any): void;

    migrate(options: { force?: string, table?: string, migrationsPath?: string }): Promise<Database>;

    on(event: "trace", listener: (sql: string) => void): void;
    on(event: "profile", listener: (sql: string, time: number) => void): void;
    on(event: "error", listener: (err: Error) => void): void;
    on(event: "open" | "close", listener: () => void): void;
    on(event: string, listener: (...args: any[]) => void): void;
  }

  export function open(filename: string, options?: { mode?: number, verbose?: boolean, promise?: typeof Promise, cached?: boolean }): Promise<Database>;
}
