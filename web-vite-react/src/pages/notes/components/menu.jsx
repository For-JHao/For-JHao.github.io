import { Menu } from 'antd';
import PropTypes from 'prop-types';

import noteList from '/notesList.json'
import Display from './display';

//TODO. undefined
// const noteFileName=import.meta.env.VITE_NOTE_PATH
// console.log(noteFileName)

let initKey = 0

function menuItemPack(labelArr=[], prePath = '') {
    //item eg. { key: 1, label: 'test1',children:[{key:12,label:'test12'}] },

    let label = labelArr.shift()
    let path = prePath + '/' + label

    if (labelArr.length === 0) return { key: initKey++, label, path }

    return { key: initKey++, label, path, children: [menuItemPack(labelArr, path)] }

}

function getMenuList(listItem) {

    let list = []

    for (let path of listItem) {
        let pathArr = path.split('\\')

        let temList = list, target = null
        while (pathArr.length >= 2) {
            //find the menu should be injected
            target = temList.find(el => el.label === pathArr[0])
            if (target === undefined) break
            else {
                temList = target.children
                pathArr.shift()
            }
        }

        let newMenu = menuItemPack(pathArr, target?.path)

        //sort. make sure folders on the menu top
        newMenu.children ? temList.unshift(newMenu) : temList.push(newMenu)

    }

    return list
}

NotesMenu.propTypes = {
    onMenuClick: PropTypes.func
}

export default function NotesMenu({ onMenuClick }) {

    const homeBtStyle={
        height:'40px',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    let items = getMenuList(noteList)

    return (
        <>
            <div style={homeBtStyle}>
                <a href='/'>Home Page</a>
            </div>
            {/* 由于Ant Design的机制，Menu 会渲染两次 */}
            <Menu
                mode="inline"
                items={items}
                onClick={onMenuClick}
            />
        </>
    )
}

