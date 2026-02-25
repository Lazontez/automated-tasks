const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv').config()

const downLoadsFolderPath = process.env.downloadFolderPath

function scanDownloads(filePath) {
    if (!filePath) {
        console.log('No Downloads Folder....')
    }
    try {
        const downloadsFolder = fs.readdirSync(filePath);
        return downloadsFolder
    } catch (error) {
        console.error('Error Reading Downloads File')
    }
}
function filterFiles() {

    try {
        const downloads = scanDownloads(downLoadsFolderPath)
        for (const x of downloads) {
            const fileStat = fs.statSync(downLoadsFolderPath + '\\' + x)
            const age = Date.now() - fileStat.mtimeMs;
            const days = age / (1000 * 60 * 60 * 24);
            if (days > 14) {
                console.log(x, Math.floor(days) + ' days old')
                moveFile(downLoadsFolderPath + '\\' + x)
            }

        }
    }
    catch(error) {
        console.error('Error Filtering Files')
    }
}

function moveFile(file){
    const downloadsArchive = process.env.downloadsArchive
    if(!fs.existsSync(downloadsArchive)){
        fs.mkdirSync(downloadsArchive, {recursive: true})
    }
    fs.renameSync(file, downloadsArchive + '\\' + path.basename(file))
    console.log('Moved: ' + path.basename(file) + ' to ' + downloadsArchive)
    
}


filterFiles()