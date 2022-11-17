import util from 'util';
import {exec, ExecSyncOptionsWithBufferEncoding} from 'child_process';
import fs from 'fs';
import path from 'path';
import getInfo from "./info";

const { name } = getInfo();

const execAsync = util.promisify(exec);

const config = {
  tempDir: `node_modules/.${name}`,
  privateKeyName: 'private_key.pem',
  certName: 'cert.pem',
  hosts: ['localhost', '0.0.0.0', '::1'],
  execOptions: {
    stdio: 'pipe',
  } as ExecSyncOptionsWithBufferEncoding,
};

/**
 * Create a certificate using `mkcert` and return it
 */
const cert127 = async () => {
  try {
    // Create the temp directory
    await execAsync(`mkdir -p ${config.tempDir}`, config.execOptions);

    // Create the certificate
    await execAsync(
      `mkcert -key-file ${config.tempDir}/${config.privateKeyName} -cert-file ${config.tempDir}/${config.certName} ${config.hosts.join(' ')}`,
      config.execOptions,
    );
  } catch (e) {
    throw new Error(
      // @ts-ignore
      `"${name}" failed with the following error:\n${e?.stderr?.toString()}`,
    );
  }

  // Read the private key
  const privateKey = await fs.readFileSync(
    path.resolve(process.cwd(), config.tempDir, config.privateKeyName),
  );

  // Read the certificate
  const cert = await fs.readFileSync(
    path.resolve(process.cwd(), config.tempDir, config.certName),
  );

  // TODO: should we delete the files after we're done? (maybe not, because we might need them again)

  return { key: privateKey, cert };
};

export default cert127;
