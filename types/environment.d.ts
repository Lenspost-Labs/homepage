// type declaration of environmet variables
namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXT_PUBLIC_PROJECT_ID: string;
    NEXT_PUBLIC_DEV_URL: string;
  }
}
