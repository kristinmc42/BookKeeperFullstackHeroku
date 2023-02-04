declare global {
    namespace NodeJS {
      interface ProcessEnv {
        MYSQL_URL: string;
        DATABASE_URL: string;
      }
    }
  }
  export {};