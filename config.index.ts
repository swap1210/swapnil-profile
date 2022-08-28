import { mkdir, writeFile } from 'fs';

const targetPath1 = './src/environments/environment.ts';
const targetPath2 = './src/environments/environment.prod.ts';
const projectId = 'swapnilpatel-projects';
let apikey = process.env['APIKEY'];
let prod_apikey = process.env['PROD_APIKEY'];
let envVersion = '1.0';

const envConfigFile1 = `export const environment = {
   production: false,
   instance: 'Development',
   firebase: {
                "apiKey": '${apikey}',
                "authDomain": '${projectId}.firebaseapp.com',
                "projectId": '${projectId}',
              },
    version: '${envVersion}'
};
`;
const envConfigFile2 = `export const environment = {
   production: true,
   instance: 'Production',
   firebase: {
              "apiKey": '${prod_apikey ? prod_apikey : apikey}',
              "authDomain": '${projectId}.firebaseapp.com',
              "projectId": '${projectId}',
            },
    version: '${envVersion}'
};
`;
mkdir('./src/environments/', (err) => {
	if (err) {
		return console.log(err);
	}
});
writeFile(targetPath1, envConfigFile1, 'utf8', (err) => {
	if (err) {
		return console.log(err);
	}
});
writeFile(targetPath2, envConfigFile2, 'utf8', (err) => {
	if (err) {
		return console.log(err);
	}
});
