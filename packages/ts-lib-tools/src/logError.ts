// eslint-disable-next-line import/no-extraneous-dependencies
import chalk from 'chalk';

// eslint-disable-next-line no-console
const stderr = console.error.bind(console);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
/**
 * @param err
 */
export default function logError(err: any): void {
  const error = err.error || err;
  const description = `${error.name ? `${error.name}: ` : ''}${
    error.message || error
  }`;
  const message = error.plugin
    ? `(${error.plugin} plugin) ${description}`
    : description;

  stderr(chalk.bold.red(message));

  if (error.loc) {
    stderr();
    stderr(`at ${error.loc.file}:${error.loc.line}:${error.loc.column}`);
  }

  if (error.frame) {
    stderr();
    stderr(chalk.dim(error.frame));
  } else if (err.stack) {
    const headlessStack = error.stack.replace(message, '');
    stderr(chalk.dim(headlessStack));
  }

  stderr();
}
