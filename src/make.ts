import {CreateGatewayParams } from './types';
import * as show from './messages';
import spawn from 'cross-spawn';
import fs from 'fs';
import { ncp } from 'ncp';
import path from 'path';

export async function createProject({ frontend, projectPath, templatesDir, projectName }:  CreateGatewayParams): Promise<boolean> {

    await createGateway({ frontend, projectPath, templatesDir, projectName });

  return true;
}

async function createGateway({ frontend, projectPath, templatesDir, projectName }: CreateGatewayParams) {
  const sourceFrontendDir = path.resolve(`${templatesDir}/frontend/gateway`);
  fs.mkdirSync(projectPath, { recursive: true });
  await copyDir(sourceFrontendDir, projectPath);
}

// Wrap `ncp` tool to wait for the copy to finish when using `await`
export function copyDir(source: string, dest: string) {
  return new Promise<void>((resolve, reject) => {
    ncp(source, dest, {}, err => err ? reject(err) : resolve());
    //fs.mkdirSync(dest + '/apps/${gatewayName}')
    //add bos.config.json
  });
}

export async function runDepsInstall(projectPath: string) {
  show.depsInstall();
  //CHANGED TO PNPM
  await new Promise<void>((resolve, reject) => spawn('pnpm', ['install'], {
    cwd: projectPath,
    stdio: 'inherit',
  }).on('close', (code: number) => {
    if (code !== 0) {
      show.depsInstallError();
      reject(code);
    } else {
      resolve();
    }
  }));
}

export async function runDepGitIgnore(projectPath: string){
  return new Promise<void>((resolve, reject) => {
    const gitIgnoreFileContent = 
`# Node dependencies
/node_modules

# production
/build
/dist

#mist
.env
`

  fs.writeFile(path.join(projectPath, '.gitignore'), gitIgnoreFileContent, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
})
}
