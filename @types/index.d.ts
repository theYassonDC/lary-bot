declare namespace NodeJS {
  interface ProcessEnv {
    DB_HOST: string;
    // DB_PORT: number | any;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
  }
}