declare module 'pako';
declare module '@env' {
  export const REDIS_HOST: string;
  export const REDIS_KEY: string;
  export const REDIS_PORT: number;
}

declare module '*.gz';
