# @masum-xyz/terbilang

Simple JS function to convert numbers to Indonesian words.

Usage:
```js
const terbilang = require('@masum-xyz/terbilang');
// or const terbilang = require('./index.js');

terbilang(1057); // 'Seribu lima puluh tujuh'
terbilang(1057, { style: 'title' }); // 'Seribu Lima Puluh Tujuh'
terbilang(1057, { style: 'upper' }); // 'SERIBU LIMA PULUH TUJUH'
terbilang('305.07'); // 'tiga ratus lima koma nol tujuh' (default sentence style)
