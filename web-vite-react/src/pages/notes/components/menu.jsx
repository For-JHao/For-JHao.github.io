import { Menu } from 'antd';
import PropTypes from 'prop-types';

import noteList from '/notesList.json'

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
        //note. different OS use different separator
        //eg. windows:'\\', ubuntu:'/'
        let pathArr = path.split('\\')

        let temList = list, target = null, prePath=''
        while (pathArr.length >= 2) {
            //find the menu should be injected
            target = temList.find(el => el.label === pathArr[0])
            if (target === undefined) break
            else {
                temList = target.children
                prePath=target.path
                pathArr.shift()
            }
        }

        let newMenu = menuItemPack(pathArr, prePath)

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

