/**
 * @file index.js
 * @description Terbilang (Bahasa Indonesia) - final version
 *
 * Features:
 * - Convert integer part to words (nol, satu, dua, ... triliun)
 * - Handle negative numbers (prefix "minus ")
 * - Handle decimals: read digit-by-digit after decimal point ("koma dua lima")
 * - Styles: 'sentence' (default), 'lower', 'upper', 'title'
 * - Accepts number or numeric string (supports '.' or ',' as decimal separator)
 *
 * Usage:
 * const terbilang = require('./index.js');
 * terbilang(1057) // 'Seribu lima puluh tujuh'
 * terbilang(-42.05, { style: 'title' }) // 'Minus Empat Puluh Dua Koma Nol Lima'
 */

const DIGIT_WORDS = [
    'nol', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'
];

function _toWords(n) {
    // n assumed to be non-negative integer (Number, safe within JS integer range)
    n = Math.floor(n);
    if (n < 12) return DIGIT_WORDS[n];
    if (n < 20) return _toWords(n - 10) + ' belas';
    if (n < 100) {
        const tens = Math.floor(n / 10);
        const rest = n % 10;
        return _toWords(tens) + ' puluh' + (rest ? ' ' + _toWords(rest) : '');
    }
    if (n < 200) return 'seratus' + (n - 100 ? ' ' + _toWords(n - 100) : '');
    if (n < 1000) {
        const hundreds = Math.floor(n / 100);
        const rest = n % 100;
        return _toWords(hundreds) + ' ratus' + (rest ? ' ' + _toWords(rest) : '');
    }
    if (n < 2000) return 'seribu' + (n - 1000 ? ' ' + _toWords(n - 1000) : '');
    if (n < 1000000) {
        const thousands = Math.floor(n / 1000);
        const rest = n % 1000;
        return _toWords(thousands) + ' ribu' + (rest ? ' ' + _toWords(rest) : '');
    }
    if (n < 1000000000) {
        const millions = Math.floor(n / 1000000);
        const rest = n % 1000000;
        return _toWords(millions) + ' juta' + (rest ? ' ' + _toWords(rest) : '');
    }
    if (n < 1000000000000) {
        const billions = Math.floor(n / 1000000000);
        const rest = n % 1000000000;
        return _toWords(billions) + ' miliar' + (rest ? ' ' + _toWords(rest) : '');
    }
    if (n < 1000000000000000) {
        const trillions = Math.floor(n / 1000000000000);
        const rest = n % 1000000000000;
        return _toWords(trillions) + ' triliun' + (rest ? ' ' + _toWords(rest) : '');
    }
    // fallback for extremely large integers: return the number as string
    return String(n);
}

function _readFractionalDigits(fracStr) {
    // fracStr: string of digits, e.g. "05" or "25"
    // reads each digit as word: "nol lima" or "dua lima"
    if (!fracStr) return '';
    const digits = fracStr.replace(/[^0-9]/g, '').split('');
    if (digits.length === 0) return '';
    return 'koma ' + digits.map(d => DIGIT_WORDS[Number(d)] || '').join(' ');
}

function applyStyle(text, style) {
    if (!text) return text;
    style = (style || 'sentence').toLowerCase();
    if (style === 'lower') return text.toLowerCase();
    if (style === 'upper') return text.toUpperCase();
    if (style === 'title' || style === 'capitalize') {
        // Capitalize first letter of every word
        return text
            .toLowerCase()
            .split(' ')
            .map(w => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
            .join(' ');
    }
    // sentence: capitalize first letter only
    const lower = text.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
}

/**
 * terbilang main function
 * @param {number|string} input - number or numeric string (supports '.' or ',' for decimal)
 * @param {object} options - { style: 'lower'|'upper'|'sentence'|'title' }
 * @returns {string} - terbilang string
 */
function terbilang(input, options = {}) {
    const style = options.style || 'sentence';

    if (input === null || input === undefined) return '';

    // If input is string, clean it.
    let raw = input;
    if (typeof input === 'string') {
        raw = input.trim();
        raw = raw.replace(/\s+/g, '');
        const negative = raw.startsWith('-');
        raw = raw.replace(/_/g, ''); // remove underscores
        const lastDot = raw.lastIndexOf('.');
        const lastComma = raw.lastIndexOf(',');
        if (lastDot === -1 && lastComma === -1) {
        } else {
            const lastSepIndex = Math.max(lastDot, lastComma);
            const sepChar = raw[lastSepIndex];
            // remove all '.' and ',' then insert '.' at lastSepIndex position (relative)
            const withoutSeps = raw.replace(/[.,]/g, '');
            const left = withoutSeps.slice(0, lastSepIndex - (raw.length - withoutSeps.length));
            const right = withoutSeps.slice(lastSepIndex - (raw.length - withoutSeps.length));
            raw = left + '.' + right;
            if (negative && !raw.startsWith('-')) raw = '-' + raw;
        }
    }

    // Now attempt to parse number
    let num;
    if (typeof raw === 'number') {
        num = raw;
    } else {
        if (raw === '' || raw === '-' || raw === '+') return '';
        const cleaned = String(raw).replace(/\s+/g, '');
        if (isNaN(Number(cleaned))) return '';
        num = Number(cleaned);
    }
    if (!isFinite(num)) return '';
    const negative = num < 0;
    const absNum = Math.abs(num);
    const integerPart = Math.floor(absNum);
    let fracStr = '';
    if (String(raw).includes('.')) {
        const parts = String(raw).split('.');
        if (parts.length >= 2) fracStr = parts.slice(1).join('');
        fracStr = fracStr.replace(/[^0-9]/g, '');
    } else {
        const absStr = String(absNum);
        if (absStr.includes('.')) {
            const parts = absStr.split('.');
            fracStr = parts[1].replace(/0+$/, ''); // trim trailing zeros
        }
    }
    let words;
    if (integerPart === 0) {
        words = 'nol';
    } else {
        words = _toWords(integerPart);
    }
    if (fracStr && fracStr.length > 0) {
        const fractionalWords = _readFractionalDigits(fracStr);
        if (fractionalWords) {
            words = words + ' ' + fractionalWords;
        }
    }
    if (negative) {
        words = 'minus ' + words;
    }
    words = words.replace(/\s+/g, ' ').trim();
    return applyStyle(words, style);
}

module.exports = terbilang;
module.exports.default = terbilang;
