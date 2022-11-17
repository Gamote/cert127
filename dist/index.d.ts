/// <reference types="node" />
/**
 * Create a certificate using `mkcert` and return it
 */
declare const makeCert: () => Promise<{
    key: Buffer;
    cert: Buffer;
}>;
export default makeCert;
