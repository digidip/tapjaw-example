import { readFileSync } from 'fs';

export interface PackageJSON {
    name: string;
    version: string;
    description: string;
}

const yarnPackage = JSON.parse(readFileSync(__dirname + '/../../../package.json').toString('utf8')) as PackageJSON;

export default yarnPackage;
