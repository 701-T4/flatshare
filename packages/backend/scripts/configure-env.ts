// import fs from 'fs';
import * as fs from 'fs';

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

  // Use Regular Expression to retrieve every key followed with an = symbol. E.g. PORT=
  const regex = /(.*=)/g;
  const environmentKeys = data.match(regex);
  const templateKeys = dataTemplate.match(regex);

  // Checks the current environment contains all the required keys from the template
  const isValidated = templateKeys.every((r) => environmentKeys.includes(r));

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
function configureEnvironmentFiles() {
  const isDevEnvironmentValidated = validateEnvironmentFile(PATH_DEV);
  const isProdEnvironmentValidated = validateEnvironmentFile(PATH_PROD);
  return isProdEnvironmentValidated && isDevEnvironmentValidated;
}

export default configureEnvironmentFiles;
// configureEnvironmentFile(path_dev);
// configureEnvironmentFile(path_prod);
