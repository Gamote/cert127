"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Cannot be `import` as it's not under TS root dir
// This way it will be excluded from the `dist` folder
// More info [here](https://stackoverflow.com/a/57934516/10878244)
// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-assignment
const packageJson = require('../../../package.json');
function getProjectInfo() {
    return packageJson;
}
exports.default = getProjectInfo;
//# sourceMappingURL=get-project-info.js.map