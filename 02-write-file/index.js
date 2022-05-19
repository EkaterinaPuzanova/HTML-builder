const fs = require('fs');
const path = require('path');

const { stdin, stdout } = process;

const output = fs.createWriteStream(path.join(__dirname, 'file.txt'));

stdout.write('Привет! Введите текст, который хотетите записать в файл.\n');

let k = 0;
stdin.on('data', data => {  if (data.toString().slice(0,-2) === 'exit') process.exit(); k += 1; output.write(data);  });
process.on('SIGINT', () => process.exit());

process.on('exit', () => { (k != 0) ? stdout.write('Введенный текст успешно записан в созданный файл file.txt. Пока!') : stdout.write('Успешно создан файл file.txt. Пока!');});