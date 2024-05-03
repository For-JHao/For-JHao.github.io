import fs from 'fs'
import path from 'path'

fs.readdir('../myNote/note/learningNotes', { recursive: true }, (err, files) => {
    if (err) {
        console.error('Error reading folder:', err);
        return;
    }

    //过滤
    //协商规则，以--结尾的md文件为临时文件，过滤
    const fileList = files.filter(el => el.endsWith('.md')&& !el.endsWith('--.md')).sort()

    console.log('当前操作系统的路径分隔符是:', path.sep);
    console.log(fileList)

    fs.writeFileSync('notesList.json', JSON.stringify(fileList));
})