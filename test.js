const terbilang = require('./index.js');

const cases = [
    0,
    5,
    10,
    11,
    15,
    21,
    1057,
    1000000,
    1234567890,
    -42,
    '305.07',
    '1001',
];

for (const c of cases) {
    console.log(c, '=>', terbilang(c));
    console.log(c, '=>', terbilang(c, {style: 'lower'}));
    console.log(c, '=>', terbilang(c, {style: 'upper'}));
    console.log(c, '=>', terbilang(c, {style: 'title'}));
    console.log('---');
}
