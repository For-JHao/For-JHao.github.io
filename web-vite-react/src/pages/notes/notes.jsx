import NotesMenu from "./components/menu"
import Display from "./components/display"
import { marked } from 'marked';

import "./notes.css"

import { theme, Layout } from 'antd';
import { useCallback, useState, memo, useRef } from "react";
import { GithubOutlined, RollbackOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

function readMdFiles(url) {
    return fetch(url).then((response) => {
        return response.text()
    })
}


const NotesMenuMO = memo(NotesMenu)


function NotesPannel() {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const layoutStyle = {
        height: "100%",
        width: "100%",
        maxWidth: "1080px",
        margin: "0 auto"
    }

    const headerStyle = {
        background: colorBgContainer,
    }

    let [mdContent, setMdContent] = useState('')

    //used for refreshing menu
    let [menuLoadTrigger, setMenuLoadTrigger] = useState(0)

    const loadMdContent = useCallback((obj) => {
        readMdFiles(obj.item.props.path).then(file => {
            setMdContent(marked.parse(file))
        })
    }, [])

    const backToNoteDefault = function () {
        setMdContent('')
        setMenuLoadTrigger(menuLoadTrigger + 1)
    }

    const boxRef = useRef(null)
    if (boxRef.current) {
        boxRef.current.scrollTop = 0;
    }

    return (
        <div className="notesPanel">
            <Layout style={layoutStyle}>
                <Sider theme='light' breakpoint="md" className="menuSider">
                    <NotesMenuMO onMenuClick={loadMdContent} reload={menuLoadTrigger} />
                </Sider>
                <Layout>
                    <Header style={headerStyle} className="notesHeader">
                        <div onClick={() => backToNoteDefault()}><RollbackOutlined className="icon" /></div>
                        <div onClick={() => window.location = 'https://github.com/For-JHao/For-JHao.github.io'}>
                            <GithubOutlined className="icon" />
                        </div>
                    </Header>
                    <Content className="ntoesContent" ref={boxRef}>
                        <Display content={mdContent}></Display>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}


export default NotesPannel