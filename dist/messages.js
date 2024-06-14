"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.depsInstallError = exports.depsInstall = exports.creatingApp = exports.directoryExists = exports.windowsWarning = exports.unsupportedNodeVersion = exports.argsError = exports.gatewayInstructions = exports.setupSuccess = exports.successFrontendToText = exports.setupFailed = exports.welcome = exports.show = void 0;
const chalk_1 = __importDefault(require("chalk"));
if (process.env.NEAR_NO_COLOR) {
    chalk_1.default.level = 0;
}
const show = (...args) => console.log(...args);
exports.show = show;
const welcome = () => (0, exports.show)((0, chalk_1.default) `
{blue ======================================================}
👋 {bold {green Welcome to Urbit's Create Near App! Learn more at https://docs.urbit.org/
}} 
🔧 Let's get your project ready.
{blue ======================================================}`);
exports.welcome = welcome;
const setupFailed = () => (0, exports.show)((0, chalk_1.default) `{bold {red ==========================================}}
{red ⛔️ There was a problem during the project setup}.
Please refer to https://github.com/urbit/create-near-app README to troubleshoot.
Notice: some platforms aren't supported (yet).
{bold {red ==========================================}}`);
exports.setupFailed = setupFailed;
const frontendTemplates = {
    //'next-app': 'NextJS (App Router)',
    'gateway': 'ReactApp',
};
const successFrontendToText = (frontend) => frontend === 'none'
    ? ''
    : (0, chalk_1.default) `a gateway using ${frontendTemplates[frontend]}`;
exports.successFrontendToText = successFrontendToText;
const setupSuccess = (projectName, frontend, install) => (0, exports.show)((0, chalk_1.default) `
{green ======================================================}
✅  Success! Created '${projectName}', ${(0, exports.successFrontendToText)(frontend)}.
{bold {bgYellow {black Next steps}}}:
${(0, exports.gatewayInstructions)(projectName, frontend, install)}`);
exports.setupSuccess = setupSuccess;
const gatewayInstructions = (projectName, frontend, install) => frontend === 'none'
    ? ''
    : (0, chalk_1.default) `
   - {inverse Navigate to your project}:
         {blue cd {bold ${projectName}}}
${!install
        ? (0, chalk_1.default) `   - {inverse Install all dependencies}
         {blue pnpm {bold install}}`
        : 'Then:'}
   - {inverse Start your app}:
         {blue pnpm {bold run dev}}`;
exports.gatewayInstructions = gatewayInstructions;
const argsError = (msg) => (0, exports.show)((0, chalk_1.default) `{red Arguments error: {white ${msg}}}

Run {blue npx urbit/create-near-app} without arguments, or use:
npx urbit/create-near-app <projectName> `);
exports.argsError = argsError;
const unsupportedNodeVersion = (supported) => (0, exports.show)((0, chalk_1.default) `{red We support node.js version ${supported} or later}`);
exports.unsupportedNodeVersion = unsupportedNodeVersion;
const windowsWarning = () => (0, exports.show)((0, chalk_1.default) `{bgYellow {black Notice: On Win32 please use WSL (Windows Subsystem for Linux).}}
https://docs.microsoft.com/en-us/windows/wsl/install
Exiting now.`);
exports.windowsWarning = windowsWarning;
const directoryExists = (dirName) => (0, exports.show)((0, chalk_1.default) `{red This directory already exists! ${dirName}}`);
exports.directoryExists = directoryExists;
const creatingApp = () => (0, exports.show)((0, chalk_1.default) `\nCreating a new {bold Urbit's NEAR dApp}`);
exports.creatingApp = creatingApp;
const depsInstall = () => (0, exports.show)((0, chalk_1.default) `
{green Installing dependencies in a few folders, this might take a while.}
`);
exports.depsInstall = depsInstall;
const depsInstallError = () => (0, exports.show)((0, chalk_1.default) `{red Error installing NEAR project dependencies!}`);
exports.depsInstallError = depsInstallError;
//# sourceMappingURL=messages.js.map