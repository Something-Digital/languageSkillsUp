const zl = require('zip-lib');

zl.archiveFolder('./src', './words.zip').then(function () {
    console.log('done');
}, function (err) {
    console.log(err);
});