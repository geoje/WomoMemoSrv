declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // All

      // Develop or Production
      NEXT_PUBLIC_NEXTAUTH_URL: string;
    }
  }
}
export {};
