const fs = require('fs');
const path_dev = '../.env.development';
const path_prod = '../.env.production';

/**
 * configure the environment for .env.development and .env.production if not existing
 * @param  {} filePath - The path of environment files in backend
 */
const configureEnvironmentFile = (filePath) => {
  console.log(`Checking the existence of ${filePath}`);

  fs.access(filePath, fs.F_OK, (err) => {
    // If this is not case because of not found files, perform early return

    if (err) {
      console.error(
        `An unexpected error ${err} is encountered \n'${filePath}' file does not exist, creating from '${filePath}.template '`,
      );

      // Check the existence of template file
      fs.access(`${filePath}.template`, fs.F_OK, (err) => {
        if (err) {
          console.error(
            `Fail to find the template file '${filePath}.template' for '${filePath}'.`,
          );
        }
        return;
      });

      // copy the data from template file and paste to wanted files
      let data = fs.readFileSync(`${filePath}.template`, 'utf-8', (err) => {
        if (err) {
          console.error(`Fail to read data from '${filePath}'.template`);
        }
        return;
      });
      fs.writeFileSync(filePath, data, (err) => {
        if (err) {
          console.error(`Fail to write to '${filePath}' file`);
        }
        return;
      });

      console.log(`'${filePath}' file created successfully`);
    } else {
      console.log(`${filePath} exists`);
      validateEnvironmentFile(filePath);
    }
  });
};

/**
 * compare the content between environment files and environment template files
 * @param  {} filePath - The path of environment files in backend
 */
const validateEnvironmentFile = (filePath) => {
  console.log(`Starting to validate ${filePath}`);

  // Checks the existence of the environment template file
  fs.access(`${filePath}.template`, fs.F_OK, (err) => {
    if (err) {
      console.error(
        `Fail to find the template file '${filePath}.template' for '${filePath}'.`,
      );
    }
    return;
  });

  // Read the data from the environment file and its template
  let data = fs.readFileSync(`${filePath}`, 'utf-8', (err) => {
    if (err) {
      console.error(`Fail to read data from '${filePath}'`);
    }
    return;
  });
  let dataTemplate = fs.readFileSync(`${filePath}.template`, 'utf-8', (err) => {
    if (err) {
      console.error(`Fail to read data from '${filePath}'.template`);
    }
    return;
  });

  //Compare the existing file to its template
  if (data.toString() !== dataTemplate.toString()) {
    console.error(
      `There is a difference between '${filePath}' and '${filePath}.template', make sure you have the correct configuration in '${filePath}'`,
    );
    return;
  }

  console.log(
    `File validation succeed, there is no difference between '${filePath}' and '${filePath}.template' `,
  );
};

export default configureEnvironmentFile;
// configureEnvironmentFile(path_dev);
// configureEnvironmentFile(path_prod);
