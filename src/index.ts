import util from 'util';
import {exec, ExecSyncOptionsWithBufferEncoding} from 'child_process';
import fs from 'fs';
import path from 'path';
import getProjectInfo from "./get-project-info";
import mkcert from "mkcert";

const { name } = getProjectInfo();

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
  console.log(`Creating a certificate for ${config.hosts.join(', ')}...`);
  // create a certificate authority
  const ca = await mkcert.createCA({
    organization: 'Hello CA',
    countryCode: 'NP',
    state: 'Bagmati',
    locality: 'Kathmandu',
    validityDays: 365
  });

// then create a tls certificate
  const cert = await mkcert.createCert({
    domains: ['127.0.0.1', 'localhost', '0.0.0.0'],
    validityDays: 365,
    caKey: ca.key,
    caCert: ca.cert
  });

  console.log(cert.key, cert.cert); // certificate info
  console.log(`${cert.cert}\n${ca.cert}`); // create a full chain certificate by merging CA and domain certificates

  return {key: cert.key, cert: cert.cert};

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
  const certi = await fs.readFileSync(
    path.resolve(process.cwd(), config.tempDir, config.certName),
  );

  // TODO: should we delete the files after we're done? (maybe not, because we might need them again)

  return { key: privateKey, cert: certi };
};

export default cert127;
