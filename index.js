// index.js - @masum-xyz/terbilang
// Minimal, production-ready CommonJS module + global for CDN

const SMALL = [
    'nol', 'satu', 'dua', 'tiga', 'empat', 'lima',
    'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'
];

function _toWords(n) {
    n = Math.floor(n);
    if (n < 0) return 'minus ' + _toWords(Math.abs(n));
    if (n < 12) return SMALL[n];
    if (n < 20) return _toWords(n - 10) + ' belas';
    if (n < 100) {
        const t = Math.floor(n / 10);
        const r = n % 10;
        return _toWords(t) + ' puluh' + (r ? ' ' + _toWords(r) : '');
    }
    if (n < 200) return 'seratus' + (n - 100 ? ' ' + _toWords(n - 100) : '');
    if (n < 1000) {
        const h = Math.floor(n / 100);
        const r = n % 100;
        return _toWords(h) + ' ratus' + (r ? ' ' + _toWords(r) : '');
    }
    if (n < 2000) return 'seribu' + (n - 1000 ? ' ' + _toWords(n - 1000) : '');
    if (n < 1000000) {
        const k = Math.floor(n / 1000);
        const r = n % 1000;
        return _toWords(k) + ' ribu' + (r ? ' ' + _toWords(r) : '');
    }
    if (n < 1000000000) {
        const m = Math.floor(n / 1000000);
        const r = n % 1000000;
        return _toWords(m) + ' juta' + (r ? ' ' + _toWords(r) : '');
    }
    if (n < 1000000000000) {
        const b = Math.floor(n / 1000000000);
        const r = n % 1000000000;
        return _toWords(b) + ' miliar' + (r ? ' ' + _toWords(r) : '');
    }
    if (n < 1000000000000000) {
        const t = Math.floor(n / 1000000000000);
        const r = n % 1000000000000;
        return _toWords(t) + ' triliun' + (r ? ' ' + _toWords(r) : '');
    }
    return String(n);
}

function applyStyle(text, style) {
    if (!style || style === 'sentence') {
        text = text.toLowerCase();
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
    if (style === 'lower') return text.toLowerCase();
    if (style === 'upper') return text.toUpperCase();
    if (style === 'title' || style === 'capitalize') {
        return text
            .toLowerCase()
            .split(/\s+/)
            .map(w => w ? w.charAt(0).toUpperCase() + w.slice(1) : '')
            .join(' ');
    }
    return text;
}

function parseNumberInput(input) {
    if (input === null || input === undefined) return null;
    if (typeof input === 'number') return String(input);
    if (typeof input !== 'string') return null;
    input = input.trim();
    if (input === '') return null;

    // Handle cases like "1.234,56" (ID format) or "1,234.56" (EN format)
    const hasDot = input.indexOf('.') !== -1;
    const hasComma = input.indexOf(',') !== -1;

    if (hasComma && !hasDot) {
        // treat comma as decimal separator
        input = input.replace(/\./g, ''); // remove any stray thousands dots
        input = input.replace(/,/g, '.');
    } else if (hasComma && hasDot) {
        // both present: assume commas are thousands separators -> remove commas
        input = input.replace(/,/g, '');
    } else {
        // only dots or neither: remove commas if any (safety) and keep dot as decimal
        input = input.replace(/,/g, '');
    }

    // now input should be parseable as Number
    if (isNaN(Number(input))) return null;
    return input;
}

function decimalToWords(decimalStr, mode = 'digit') {
    if (!decimalStr) return '';
    decimalStr = decimalStr.replace(/^0+$/, '0') || decimalStr; // keep zeros
    if (mode === 'number') {
        // convert entire decimal part to a number and read it as number
        const asNum = Number(decimalStr);
        if (isNaN(asNum)) return decimalStr.split('').map(d => SMALL[Number(d)]).join(' ');
        return _toWords(asNum);
    }
    // default 'digit' mode: spell each digit
    return decimalStr.split('').map(d => {
        if (d === '-') return 'minus';
        if (d === '+') return '';
        const idx = Number(d);
        return SMALL[isNaN(idx) ? 0 : idx];
    }).join(' ');
}

function terbilang(input, opts) {
    // Accept terbilang(1057, 'title') or terbilang(1057, { style: 'title' })
    let style = 'sentence';
    let decimalMode = 'digit';

    if (typeof opts === 'string') style = opts;
    else if (typeof opts === 'object' && opts !== null) {
        if (opts.style) style = opts.style;
        if (opts.decimalMode) decimalMode = opts.decimalMode;
    }

    const parsed = parseNumberInput(String(input));
    if (parsed === null) return '';

    const negative = parsed.trim().startsWith('-');

    // split integer and fraction
    const parts = parsed.replace(/^\+/, '').split('.');
    const intPart = parts[0] === '' ? '0' : parts[0];
    const fracPart = parts[1] || '';

    const intNum = Number(intPart);
    let words = '';

    if (!isFinite(intNum)) return '';

    if (intNum === 0) words = 'nol';
    else words = _toWords(Math.abs(intNum));

    if (fracPart) {
        const fracWords = decimalToWords(fracPart, decimalMode);
        words = words + ' koma ' + fracWords;
    }

    if (negative) words = 'minus ' + words;

    return applyStyle(words, style);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = terbilang;
}

if (typeof window !== 'undefined') {
    window.terbilang = terbilang;
}

try {
    if (typeof exports === 'object' && typeof exports.default === 'undefined') {
        exports.default = terbilang;
    }
} catch (e) {
}
