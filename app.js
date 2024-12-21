const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({ input, output });

const questions = [
    'Papka nomini kiriting',
    'Fayl nomini kiriting (Misol: Database.txt)',
    'Ismingizni kiritng',
    'Familiyangiz nima?',
    'Necha yoshsiz?',
    'Qayerda yashaysiz?'
];

function createFolder(folderPath) {
    
    try {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`Folder yaratildi: ${folderPath}`);
    } catch (err) {
        console.log(err.message);
    }
}

let currentQuestionIndex = 0;
let file_path = '';
let add_file_path = '';

function askQuestion() {
  if (currentQuestionIndex < questions.length) {
    rl.question(questions[currentQuestionIndex] + " >> ", (answer) => {
      if (currentQuestionIndex === 0) {
        
        const folderPath = path.join(__dirname, answer);
        file_path = folderPath;
        createFolder(folderPath); 
      } else if (currentQuestionIndex === 1) {
        
        const data = '//Fayl yaratildi\n';
        const folderPath = path.join(file_path, answer); 
        add_file_path = folderPath;

        fs.writeFile(add_file_path, data, (err) => {
          if (err) {
            console.log(err.message);
          }
        });
      } else {
        
        const newData = `${answer};\n`;
        fs.appendFile(add_file_path, newData, (err) => {
          if (err) {
            console.log(err.message);
          }
        });
      }

      console.log(`Javob: ${answer}`);
      currentQuestionIndex++;
      askQuestion(); 
    });
  } else {
    console.log("Ma'lumotlaringiz saqlandi!");
    rl.close(); 
  }
}

askQuestion();
