/* eslint-disable indent */
const fs = require('fs');
const path = require('path');

const secretFolder = path.join(__dirname, 'secret-folder');


fs.readdir(secretFolder, function(err, items) {

    if (err) throw err;
    
    for (let i = 0; i < items.length; i += 1) {

        let secretFolderItem = path.join(__dirname, 'secret-folder', items[i]);

        fs.stat(secretFolderItem, function(err, stats) {

            if (err) throw err;

            if (stats.isFile()) {
                let expand = path.extname(secretFolderItem);
                console.log(items[i].replace(expand, '') + ' - ' + expand.replace('.', '') + ' - ' + (stats['size'] / 1000) + 'kb'); 
            }

        });

    }

});
