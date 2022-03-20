import * as dotenv from 'dotenv';
import * as fs from 'fs';

const PATH_DEV = './.env.development';
const PATH_PROD = './.env.production';

/**
 * configure the environment for .env.development and .env.production if not existing
 * @param  {} filePath - The path of environment files in backend
 */
function validateEnvironmentFile(filePath) {
  console.log(`Checking the existence of ${filePath}`);

  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    console.log(`${filePath} exists`);
    return validateKeys(filePath);
  } catch (error) {
    console.error(
      `'${filePath}' file does not exist, creating from '${filePath}.template '`,
    );

    // copy the data from template file and paste to wanted files
    const data = fs.readFileSync(`${filePath}.template`, 'utf-8');

    fs.writeFileSync(filePath, data);

    return validateKeys(filePath);
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

  const environmentFileObject = dotenv.parse(environmentConfig);
  const environmentObject = process.env;
  const templateObject = dotenv.parse(templateConfig);

  const environmentKeys = [
    ...Object.keys(environmentObject),
    ...Object.keys(environmentFileObject),
  ];
  const templateKeys = Object.keys(templateObject);

  // Checks the current environment contains all the required keys from the template
  const isValidated = templateKeys.every((key) =>
    environmentKeys.includes(key),
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
  return nodeEnvironment === 'development'
    ? validateEnvironmentFile(PATH_DEV)
    : validateEnvironmentFile(PATH_PROD);
}

export default configureEnvironmentFiles;
