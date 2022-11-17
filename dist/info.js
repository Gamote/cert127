"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Cannot be `import` as it's not under TS root dir
// This way it will be excluded from the `dist` folder
// More info [here](https://stackoverflow.com/a/57934516/10878244)
const { name, version } = require('../package.json');
function getInfo() {
    return { name, version };
}
exports.default = getInfo;
//# sourceMappingURL=info.js.map