type ProjectInfo = {
  name: string;
  title: string;
  description: string;
  version: string;
};

// Cannot be `import` as it's not under TS root dir
// This way it will be excluded from the `dist` folder
// More info [here](https://stackoverflow.com/a/57934516/10878244)
// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-assignment
const packageJson = require('../../../package.json') as ProjectInfo;

export default function getProjectInfo() {
  return packageJson;
}
