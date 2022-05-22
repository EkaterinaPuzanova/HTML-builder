/* eslint-disable indent */
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true },  err => { 
    if (err) throw err;
});

(async function copyDir() {
    const filesCopy = path.join(__dirname, 'files-copy');  
    const items = await fsPromises.readdir(filesCopy);
    if (items.length > 0) {
        for (let i = 0; i < items.length; i += 1) {
            let filesCopyItem = path.join(__dirname, 'files-copy', items[i]);
            fs.unlink(filesCopyItem, err => {
                if (err) throw err;
            });
        }
    }    

    const files = path.join(__dirname, 'files');
    const itemss = await fsPromises.readdir(files);
    for (let i = 0; i < itemss.length; i += 1) {
        let filesItem = path.join(__dirname, 'files', itemss[i]);
        let filesCopyItem = path.join(__dirname, 'files-copy', itemss[i]);
        fsPromises.copyFile(filesItem, filesCopyItem);
    }    

})();







