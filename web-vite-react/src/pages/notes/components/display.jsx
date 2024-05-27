import "../notes.css"

import notesPageUrl from '/src/assets/dog-s.jpg'

const defaultStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
}

export default function Display({ content }) {
    const defaultContent =
        <div style={defaultStyle}>
            <h1>JHao</h1>
            <div style={{ marginBottom: '10px' }}> My learning notes</div>
            <img src={notesPageUrl} alt="dog" width="100%"></img>
            <div style={{ paddingTop: '50px', paddingBottom: '10px',width:'100%' }}>
                <ul className="notesFooter">
                    <li><span>Author:</span>JHao</li>
                    <li><span>Tel:</span>13880321621</li>
                    <li><span>Email:</span>for-JHao@outlook.com</li>
                </ul>
            </div>
        </div>


    return (
        content ? <div dangerouslySetInnerHTML={{ __html: content }}></div> : defaultContent
    )
}