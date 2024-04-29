import './intro.css'

function Intro() {

    return (
        <>
            <div className="intro" id="intro">
                <div id="introTitle" className="introTitle" >
                    <h1 id="title">
                        WELCOME HERE <br />
                            My Blog 
                    </h1>
                    <p style={{fontSize: 'large'}}>Act as if what you do makes a difference. </p>
                    <a href="./notes">Notes</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="https://github.com/For-JHao/For-JHao.github.io">My Github</a>
                </div>
            </div>
        </>
    )
}

export default Intro