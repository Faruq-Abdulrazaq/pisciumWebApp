import { Link } from "react-router-dom";

const About = () => {
    return ( 
        <div className="aboutPage">
             <header>
                <div className="aboutHeader">
                    <div className="aboutLogo">
                        <img src="https://i.ibb.co/W0dYYbc/Piscium-Icon-White2.png" className="aboutLogo_img_1" alt="logo1" />
                        <img src="https://i.ibb.co/mSF7RHG/Piscium-Labs-Name-White.png" className="aboutLogo_img_2" alt="logo2" />
                    </div>
                    <div className="navigation">
                        <ul className="navigation_ul">
                            <li>Product</li>
                            <li>Business</li>
                            <li><Link to="/about" id="LinkWhite">About</Link></li>
                            <li><Link to="/signup" id="LinkWhite">Get Started</Link></li>
                            <li><Link to="/login" id="LinkWhite">Login</Link></li>
                        </ul>
                    </div>
                </div>
            </header>
            <section className="imgInfo">
                <div className="imgInfo_welcome">
                    <h1 className="imgInfo_h1">Welcome To Piscium Labs Chats</h1>
                    <p className="imgInfo_p">
                        We believe that communication should be fun, 
                        interactive, and expressive. That's why we've developed a unique chat platform
                         that allows users to express themselves through fully customizable 3D avatars.
                    </p>
                </div>
            </section>
            <section className="pisciumValues">
                
            </section>
        </div>
     );
}
 
export default About;