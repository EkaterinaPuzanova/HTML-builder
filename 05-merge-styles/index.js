/* eslint-disable indent */
const fs = require('fs');
const path = require('path');


const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));


const styles = path.join(__dirname, 'styles');
fs.readdir(styles, function (err, items) {
    if (err) throw err;
    for (let i = 0; i < items.length; i += 1) {
        let stylesItem = path.join(__dirname, 'styles', items[i]);
        fs.stat(stylesItem, function(err, stats) {
            if (err) throw err;
            if (stats.isFile()) {
                let expand = path.extname(stylesItem);
                if (expand === '.css') {
                    let input = fs.createReadStream(stylesItem, 'utf-8');
                    input.pipe(output);
                }
            }
        });
    }
});    

