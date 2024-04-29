import NotesMenu from "./components/menu"
import Display from "./components/display"
import { marked } from 'marked';

import "./notes.css"

import { theme, Layout } from 'antd';
import { useState } from "react";

const { Header, Footer, Sider, Content } = Layout;

const modules = import.meta.glob("../../../../myNote/note/learningNotes/*.md", {
    query: '?raw',
    import: 'default',
})
/** */
console.log(modules)
console.log(import.meta.env.BASE_URL)

function readMdFiles(url) {
    // fetch(url).then((response) => {
    //     console.log(response)
    //     return response.blob()})
    // .then((data) => console.log(data));

    const prefix = '../../../../myNote/note/learningNotes'

    let xhr = new XMLHttpRequest()
    console.log(prefix + url)
    xhr.open('GET', prefix + url)
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log(xhr)
            let files = xhr.responseText
            console.log(files)
        }
    }

    xhr.send()
}


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
        background: colorBgContainer
    }
    const contentStyle = {
        paddingLeft: 50,
        paddingRight: 50,
        overflow: 'auto'
    }

    let [mdContent, setMdContent] = useState('')

    function loadMdContent(obj) {
        // console.log(obj)
        // console.log(obj.item.props.path)
        // modules[obj.item.props.path]().then(res => {
        //     setMdContent(marked.parse(res))
        // })
        readMdFiles(obj.item.props.path)
    }

    return (
        <div className="notesPanel">
            <Layout style={layoutStyle}>
                <Sider theme='light' breakpoint="md" className="menuSider">
                    <NotesMenu onMenuClick={loadMdContent} />
                </Sider>
                <Layout>
                    <Header style={headerStyle}>Header</Header>
                    <Content style={contentStyle}>
                        <Display content={mdContent}></Display>
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        </div>
    )
}


export default NotesPannel