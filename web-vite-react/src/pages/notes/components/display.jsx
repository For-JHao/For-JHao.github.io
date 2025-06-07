import "../notes.css"

// import notesPageUrl from '/src/assets/dog-s.jpg'
const notesPageUrl='https://images.pexels.com/photos/2468773/pexels-photo-2468773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

const defaultStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundImage: `url('${notesPageUrl}')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '100%',
    color: 'white',
}

export default function Display({ content }) {
    const defaultContent =
        <div style={defaultStyle}>
            <h1 style={{ marginTop: '100px' }}>JHao</h1>
            <div style={{ marginBottom: '10px' }}> My learning notes</div>
            <div style={{ padding: '100px 80px', width: '100%', marginTop: 'auto' }}>
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