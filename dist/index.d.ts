/// <reference types="node" />
/**
 * Create a certificate using `mkcert` and return it
 */
declare const cert127: () => Promise<{
    key: string;
    cert: string;
} | {
    key: Buffer;
    cert: Buffer;
}>;
export default cert127;
