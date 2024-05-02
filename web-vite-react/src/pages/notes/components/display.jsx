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
            <div style={{marginBottom:'10px'}}> My learning notes</div>
            <img src="/src/assets/dog.jpg" alt="dog" width="100%"></img>
        </div>


    return (
        content ? <div dangerouslySetInnerHTML={{ __html: content }}></div> : defaultContent
    )
}