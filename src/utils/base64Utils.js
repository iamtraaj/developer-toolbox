/**
 * Base64 encode/decode utilities with error handling.
 */

/**
 * Encode a plain-text string to Base64.
 * Supports Unicode via TextEncoder → Uint8Array → Base64.
 * @param {string} text
 * @returns {{ result: string, error: string|null }}
 */
export function encodeBase64(text) {
  try {
    // btoa only handles latin1; encode as UTF-8 first
    const bytes = new TextEncoder().encode(text);
    let binary = '';
    for (const byte of bytes) {
      binary += String.fromCharCode(byte);
    }
    return { result: btoa(binary), error: null };
  } catch (err) {
    return { result: '', error: err.message };
  }
}

/**
 * Decode a Base64 string to plain text.
 * @param {string} b64
 * @returns {{ result: string, error: string|null }}
 */
export function decodeBase64(b64) {
  try {
    const binary = atob(b64.trim());
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return { result: new TextDecoder().decode(bytes), error: null };
  } catch {
    return { result: '', error: 'Invalid Base64 input. Please check your string and try again.' };
  }
}
