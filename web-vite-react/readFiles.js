import fs from 'fs'

fs.readdir('../myNote/note/learningNotes', { recursive: true }, (err, files) => {
    if (err) {
        console.error('Error reading folder:', err);
        return;
    }

    const fileList=files.filter(el => el.endsWith('.md')).sort()

    fs.writeFileSync('notesList.json', JSON.stringify(fileList));

    // 设置环境变量指示 JSON 文件路径
    //TODO. issue: In menu.jsx, can't read VITE_NOTE_PATH from import.meta.env 
    process.env.VITE_NOTE_PATH = 'notesList.json';
    console.log(process.env.VITE_NOTE_PATH)
})