import chalk from 'chalk';
import { Frontend, FrontendMessage, ProjectName } from './types';

if (process.env.NEAR_NO_COLOR) {
  chalk.level = 0;
}

export const show = (...args: unknown[]) => console.log(...args);

export const welcome = () =>
  show(chalk`
{blue ======================================================}
👋 {bold {green Welcome to Urbit's Create Near App! Learn more at https://docs.urbit.org/
}} 
🔧 Let's get your project ready.
{blue ======================================================}`);

export const setupFailed = () =>
  show(chalk`{bold {red ==========================================}}
{red ⛔️ There was a problem during the project setup}.
Please refer to https://github.com/urbit/create-near-app README to troubleshoot.
Notice: some platforms aren't supported (yet).
{bold {red ==========================================}}`);


const frontendTemplates: FrontendMessage = {
  //'next-app': 'NextJS (App Router)',
  'gateway': 'ReactApp',
};

export const successFrontendToText = (frontend: Frontend) =>
  frontend === 'none'
    ? ''
    : chalk`a gateway using ${frontendTemplates[frontend]}`;

export const setupSuccess = (
  projectName: ProjectName,
  frontend: Frontend,
  install: boolean
) =>
  show(chalk`
{green ======================================================}
✅  Success! Created '${projectName}', ${successFrontendToText(frontend)}.
{bold {bgYellow {black Next steps}}}:
${gatewayInstructions(
  projectName,
  frontend,
  install
)}`);


export const gatewayInstructions = (
  projectName: ProjectName,
  frontend: Frontend,
  install: boolean
) =>
  frontend === 'none'
    ? ''
    : chalk`
   - {inverse Navigate to your project}:
         {blue cd {bold ${projectName}}}
${
  !install
    ? chalk`   - {inverse Install all dependencies}
         {blue pnpm {bold install}}`
    : 'Then:'
}
   - {inverse Start your app}:
         {blue pnpm {bold run dev}}`;

export const argsError = (msg: string) =>
  show(chalk`{red Arguments error: {white ${msg}}}

Run {blue npx urbit/create-near-app} without arguments, or use:
npx urbit/create-near-app <projectName> `);

export const unsupportedNodeVersion = (supported: string) =>
  show(chalk`{red We support node.js version ${supported} or later}`);

export const windowsWarning = () =>
  show(chalk`{bgYellow {black Notice: On Win32 please use WSL (Windows Subsystem for Linux).}}
https://docs.microsoft.com/en-us/windows/wsl/install
Exiting now.`);

export const directoryExists = (dirName: string) =>
  show(chalk`{red This directory already exists! ${dirName}}`);

export const creatingApp = () => show(chalk`\nCreating a new {bold Urbit's NEAR dApp}`);

export const depsInstall = () =>
  show(chalk`
{green Installing dependencies in a few folders, this might take a while.}
`);

export const depsInstallError = () =>
  show(chalk`{red Error installing NEAR project dependencies!}`);
