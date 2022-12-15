"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __importDefault(require("util"));
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const get_project_info_1 = __importDefault(require("./get-project-info"));
const mkcert_1 = __importDefault(require("mkcert"));
const { name } = (0, get_project_info_1.default)();
const execAsync = util_1.default.promisify(child_process_1.exec);
const config = {
    tempDir: `node_modules/.${name}`,
    privateKeyName: 'private_key.pem',
    certName: 'cert.pem',
    hosts: ['localhost', '0.0.0.0', '::1'],
    execOptions: {
        stdio: 'pipe',
    },
};
/**
 * Create a certificate using `mkcert` and return it
 */
const cert127 = async () => {
    var _a;
    console.log(`Creating a certificate for ${config.hosts.join(', ')}...`);
    // create a certificate authority
    const ca = await mkcert_1.default.createCA({
        organization: 'Hello CA',
        countryCode: 'NP',
        state: 'Bagmati',
        locality: 'Kathmandu',
        validityDays: 365
    });
    // then create a tls certificate
    const cert = await mkcert_1.default.createCert({
        domains: ['127.0.0.1', 'localhost', '0.0.0.0'],
        validityDays: 365,
        caKey: ca.key,
        caCert: ca.cert
    });
    console.log(cert.key, cert.cert); // certificate info
    console.log(`${cert.cert}\n${ca.cert}`); // create a full chain certificate by merging CA and domain certificates
    return { key: cert.key, cert: cert.cert };
    try {
        // Create the temp directory
        await execAsync(`mkdir -p ${config.tempDir}`, config.execOptions);
        // Create the certificate
        await execAsync(`mkcert -key-file ${config.tempDir}/${config.privateKeyName} -cert-file ${config.tempDir}/${config.certName} ${config.hosts.join(' ')}`, config.execOptions);
    }
    catch (e) {
        throw new Error(
        // @ts-ignore
        `"${name}" failed with the following error:\n${(_a = e === null || e === void 0 ? void 0 : e.stderr) === null || _a === void 0 ? void 0 : _a.toString()}`);
    }
    // Read the private key
    const privateKey = await fs_1.default.readFileSync(path_1.default.resolve(process.cwd(), config.tempDir, config.privateKeyName));
    // Read the certificate
    const certi = await fs_1.default.readFileSync(path_1.default.resolve(process.cwd(), config.tempDir, config.certName));
    // TODO: should we delete the files after we're done? (maybe not, because we might need them again)
    return { key: privateKey, cert: certi };
};
exports.default = cert127;
//# sourceMappingURL=index.js.map