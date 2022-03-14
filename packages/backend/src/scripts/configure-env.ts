// import fs from 'fs';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
// import express from 'express';

const PATH_DEV = './.env.development';
const PATH_PROD = './.env.production';

/**
 * configure the environment for .env.development and .env.production if not existing
 * @param  {} filePath - The path of environment files in backend
 */
// const configureEnvironmentFile = (filePath) => {
function validateEnvironmentFile(filePath) {
  console.log(`Checking the existence of ${filePath}`);

  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    console.log(`${filePath} exists`);
    return validateKeys(filePath);
  } catch (error) {
    console.error(
      `An unexpected error ${error} is encountered \n'${filePath}' file does not exist, creating from '${filePath}.template '`,
    );

    // copy the data from template file and paste to wanted files
    const data = fs.readFileSync(`${filePath}.template`, 'utf-8');

    fs.writeFileSync(filePath, data);

    console.log(
      `'${filePath}' file created successfully \n Please start it again.`,
    );
    return false;
  }
}

/**
 * Check the environment contains all keys from its template files
 * @param  {} filePath - The path of environment files in backend
 */
function validateKeys(filePath) {
  console.log(`Starting to validate ${filePath}`);

  // Checks the existence of the environment template file
  fs.accessSync(`${filePath}.template`, fs.constants.F_OK);

  // Read the data from the environment file and its template
  const data = fs.readFileSync(`${filePath}`, 'utf-8');
  const dataTemplate = fs.readFileSync(`${filePath}.template`, 'utf-8');

  // Parse the keys
  const environmentConfig = Buffer.from(data);
  const templateConfig = Buffer.from(dataTemplate);

  const environmentObject = dotenv.parse(environmentConfig);
  const templateObject = dotenv.parse(templateConfig);

  const environmentKeys = Object.keys(environmentObject);
  const templateKeys = Object.keys(templateObject);

  console.log(
    `Key comparsions result - environment : [${environmentKeys}] template : [${templateKeys}]`,
  );

  // Checks the current environment contains all the required keys from the template
  const isValidated = environmentKeys.every((key) =>
    templateKeys.includes(key),
  );

  if (!isValidated) {
    console.log(
      `Verification fail. The current environment '${filePath}' does not contain all the required keys from its template '${filePath}.template'`,
    );
  } else {
    console.log(
      `Verification succeed. The current environment '${filePath}' contains all the required keys from its template '${filePath}.template'`,
    );
  }

  return isValidated;
}
/**
 * Verfiy the current environment files for development and production
 */
function configureEnvironmentFiles(nodeEnvironment: string): boolean {
  const isEnvironmentValidated =
    nodeEnvironment === 'development'
      ? validateEnvironmentFile(PATH_DEV)
      : validateEnvironmentFile(PATH_PROD);
  return isEnvironmentValidated;
}

export default configureEnvironmentFiles;
// configureEnvironmentFile(path_dev);
// configureEnvironmentFile(path_prod);
