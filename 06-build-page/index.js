/* eslint-disable indent */
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true },  err => { 
    if (err) throw err;
});


(async function() {

    const template = path.join(__dirname, 'template.html');
    let index = path.join(__dirname, 'project-dist', 'index.html');
    const data = await fsPromises.readFile(template, 'utf-8');
    fsPromises.writeFile(index, data);  

    const components = path.join(__dirname, 'components');


    const items = await fsPromises.readdir(components);
    for (let i = 0; i < items.length; i += 1) {
        const componentsItem = path.join(__dirname, 'components', items[i]);
        const stats = await fsPromises.stat(componentsItem);
            if (stats.isFile()) {
                let expand = path.extname(componentsItem);
                if (expand === '.html') {
                    let data = await fsPromises.readFile(index, 'utf-8')  ;
                    let text = await fsPromises.readFile(componentsItem, 'utf-8')  ;    
                    data = data.replace(`{{${items[i].replace(expand, '')}}}`, text);
                    fsPromises.writeFile(index, data);    
                }
            }
    
    } 
       
  
    const outputStyle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

    const styles = path.join(__dirname, 'styles');
    fs.readdir(styles, async function (err, items) {
        if (err) throw err;
        for (let i = 0; i < items.length; i += 1) {
            let stylesItem = path.join(__dirname, 'styles', items[i]);
            const stats = await fsPromises.stat(stylesItem);
                if (stats.isFile()) {
                    let expand = path.extname(stylesItem);
                    if (expand === '.css') {
                        let data = await fsPromises.readFile(stylesItem, 'utf-8');
                        outputStyle.write(data);
                    }
                }
        }
    });


    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true },  err => { 
        if (err) throw err;
    });

    const assets = path.join(__dirname, 'assets');
    async function copyDir(dir, way) {
        const items = await fsPromises.readdir(dir);
        for (let item of items) {
            
                let dirItem = path.join(path.dirname(dir), path.basename(dir), item);
                const stats = await fsPromises.stat(dirItem);
                if (stats.isFile()) {
                    fsPromises.copyFile(dirItem, path.join(way, path.basename(dirItem)));
                }
                if (stats.isDirectory()) {
                    way = path.join(__dirname, 'project-dist', path.basename(dir), path.basename(dirItem));
                    fs.mkdir(way, { recursive: true },  err => { 
                        if (err) throw err;
                    });
                    copyDir(dirItem, way);
                }
            
        }    
    }
    copyDir(assets);

})();