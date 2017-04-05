'use strict';

var yap = require('../index');

yap.play({ url: 'http://youtube.com/watch?v=XAYhNHhxN0A' });

setTimeout(function () {
  yap.stop();
}, 3000);