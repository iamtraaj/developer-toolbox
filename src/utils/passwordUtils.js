/**
 * Password utility helpers
 */

const CHARS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

/**
 * Generate a cryptographically random password given the supplied options.
 * @param {Object} opts
 * @param {number} opts.length
 * @param {boolean} opts.uppercase
 * @param {boolean} opts.lowercase
 * @param {boolean} opts.numbers
 * @param {boolean} opts.symbols
 * @returns {string}
 */
export function generatePassword({ length, uppercase, lowercase, numbers, symbols }) {
  let pool = '';
  const required = [];

  if (uppercase) { pool += CHARS.uppercase; required.push(CHARS.uppercase); }
  if (lowercase) { pool += CHARS.lowercase; required.push(CHARS.lowercase); }
  if (numbers)   { pool += CHARS.numbers;   required.push(CHARS.numbers); }
  if (symbols)   { pool += CHARS.symbols;   required.push(CHARS.symbols); }

  if (!pool) return '';

  const array = new Uint32Array(length + required.length);
  crypto.getRandomValues(array);

  // Start with one character from each required set
  const chars = required.map((set, i) => set[array[i] % set.length]);

  // Fill the rest from the full pool
  for (let i = required.length; i < length; i++) {
    chars.push(pool[array[i] % pool.length]);
  }

  // Fisher-Yates shuffle using crypto values
  const shuffleArray = new Uint32Array(chars.length);
  crypto.getRandomValues(shuffleArray);
  for (let i = chars.length - 1; i > 0; i--) {
    const j = shuffleArray[i] % (i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.slice(0, length).join('');
}

/**
 * Returns a strength label and numeric score 0-4.
 */
export function getPasswordStrength(password) {
  if (!password) return { label: 'None', score: 0, color: 'slate' };

  let score = 0;
  if (password.length >= 12) score++;
  if (password.length >= 20) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  // Clamp to 0-4
  const clamped = Math.min(4, Math.floor((score / 6) * 4));

  const map = [
    { label: 'Very Weak', color: 'red' },
    { label: 'Weak',      color: 'orange' },
    { label: 'Fair',      color: 'amber' },
    { label: 'Strong',    color: 'blue' },
    { label: 'Very Strong', color: 'emerald' },
  ];

  return { ...map[clamped], score: clamped };
}
