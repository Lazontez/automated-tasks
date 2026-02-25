const fs = require('fs');
const path = require('path');
const os = require('os');

// --- CONFIG ---
const WATCH_FOLDER = path.join(os.homedir(), 'Downloads');
const DESTINATION_FOLDER = 'C:\\Users\\lazon\\FortyAU\\BankVOD Docs\\QA Docs\\Test Evidence';
const PDF_PATTERN = /^ng-/i; 
// --------------

if (!fs.existsSync(DESTINATION_FOLDER)) {
  fs.mkdirSync(DESTINATION_FOLDER, { recursive: true });
}

function resolveDestPath(targetFolder, filename) {
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  let destPath = path.join(targetFolder, filename);
  let counter = 1;
  while (fs.existsSync(destPath)) {
    destPath = path.join(targetFolder, `${base} (${counter})${ext}`);
    counter++;
  }
  return destPath;
}

function moveFile(filename) {
  const folderName = path.basename(filename, '.pdf').toUpperCase();
  const targetFolder = path.join(DESTINATION_FOLDER, folderName);
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true });
  }
  const sourcePath = path.join(WATCH_FOLDER, filename);
  const destPath = resolveDestPath(targetFolder, filename);
  fs.renameSync(sourcePath, destPath);
  console.log(`Moved: ${filename} → ${destPath}`);
}

fs.readdirSync(WATCH_FOLDER).forEach(filename => {
  if (PDF_PATTERN.test(filename) && filename.toLowerCase().endsWith('.pdf')) {
    moveFile(filename);
  }
});

fs.watch(WATCH_FOLDER, (_eventType, filename) => {
  if (!filename) return;

  if (
    PDF_PATTERN.test(filename) &&
    filename.toLowerCase().endsWith('.pdf')
  ) {
    setTimeout(() => {
      if (fs.existsSync(path.join(WATCH_FOLDER, filename))) {
        moveFile(filename);
      }
    }, 1000);
  }
});

console.log(`Watching: ${WATCH_FOLDER}`);




