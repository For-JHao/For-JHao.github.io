import './intro.css'
import { Link } from "react-router-dom";

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
                    <div className='introLink'><Link to="/notes">Get in</Link></div>
                    
                    {/* &nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="https://github.com/For-JHao/For-JHao.github.io">Github</a> */}
                </div>
            </div>
        </>
    )
}

export default Intro