declare module 'validate-npm-package-name';

interface CreateOptions {
  version: string;
  projectName: string;
  packageName: string;
  packageVersion: string;
  packageDescription?: string;
  auth?: string;
}
