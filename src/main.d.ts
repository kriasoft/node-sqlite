declare module 'sqlite' {
  class Statement {
    public readonly sql: string;
    public readonly lastID: number;
    public readonly changes: number;

    public bind(): Promise<Statement>;
    public bind(...params: any[]): Promise<Statement>;

    public reset(): Promise<Statement>;

    public finalize(): Promise<void>;

    public run(): Promise<Statement>;
    public run(...params: any[]): Promise<Statement>;

    public get(): Promise<any>;
    public get(...params: any[]): Promise<any>;

    public all(): Promise<any[]>;
    public all(...params: any[]): Promise<any[]>;

    public each(callback?: (err: Error, row: any) => void): Promise<number>;
    public each(...params: any[]): Promise<number>;
  }

  class Database {
    public close(): Promise<void>;

    public run(sql: string): Promise<Statement>;
    public run(sql: string, ...params: any[]): Promise<Statement>;

    public get(sql: string): Promise<any>;
    public get(sql: string, ...params: any[]): Promise<any>;

    public all(sql: string): Promise<any[]>;
    public all(sql: string, ...params: any[]): Promise<any[]>;

    public exec(sql: string): Promise<Database>;

    public each(sql: string, callback?: (err: Error, row: any) => void): Promise<number>;
    public each(sql: string, ...params: any[]): Promise<number>;

    public prepare(sql: string): Promise<Statement>;
    public prepare(sql: string, ...params: any[]): Promise<Statement>;

    public migrate(options: { force?: boolean, table?: string, migrationsPath?: string }): Promise<Database>;
  }

  export function open(filename: string, options?: { mode?: number, verbose?: boolean, promise?: typeof Promise }): Promise<Database>;
  export default { open }
}
