import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faNetworkWired } from "@fortawesome/free-solid-svg-icons";
import { faLaptop } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
    return ( 
        <div className="home">
         <header>
            <div className="headerBox_1">
                <div className="logo">
                    <img src="https://i.ibb.co/W0dYYbc/Piscium-Icon-White2.png" className="logo_img_1" alt="logo1"/>
                    <img src="https://i.ibb.co/mSF7RHG/Piscium-Labs-Name-White.png" className="logo_img_2" alt="logo2" />
                </div>
                <div className="navigation">
                    <ul className="navigation_ul">
                        <li>Product</li>
                        <li>Business</li>
                        <li><Link to="/about" id="LinkWhite">About</Link></li>
                        
                    </ul>
                </div>
            </div>
            <div className="headerBox_2">
                <div className="navigation">
                    <ul className="navigation_ul">
                        <li><Link to="/signup" id="Link">Get Started</Link></li>
                        <li><Link to="/login" id="Link">Login</Link></li>
                    </ul>
                </div>
            </div>
        </header>

        <section className="info">
            <div className="content">
                <div className="infobox">
                    <div className="textBx-1">
                        <h1>Build your AI friend</h1>
                        <p>A revolutionary 3D character chat application that 
                            brings your conversations to life!
                            With Piscium Chat, you can connect with friends and loved ones in a whole new way. 
                            Our advanced technology allows you to create your own unique 3D avatar, which you can use to 
                            communicate with others through text, voice, and video chat.

                            Pisium Chat is more than just a chat app - it's a fully immersive social experience. 
                            You can customize your avatar's appearance and even express yourself with a range 
                            of facial expressions and gestures. Plus, our virtual world offers a variety of activities
                             and social features to keep you entertained and connected with others

                           </p>
                    </div>

                    <div className="textBx-2">
                        <div>
                            <FontAwesomeIcon icon={faBrain} className='i'></FontAwesomeIcon>
                            <h3>Memory</h3>
                            <h6>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h6>
                        </div>
                        <div>
                           <FontAwesomeIcon icon={faPhone} className='i'></FontAwesomeIcon>
                            <h3>Calls</h3>
                            <h6>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h6>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faNetworkWired} className='i'></FontAwesomeIcon>
                            <h3>Wikipedia</h3>
                            <h6>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h6>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faLaptop} className='i'></FontAwesomeIcon>
                            <h3>Learning</h3>
                            <h6>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h6>
                        </div>
                    </div>


                    <div className="textBx-3">
                        <h4>Build your AI friend</h4>
                        <p>Whether you're looking to make new friends, catch up with old ones, 
                            or just have some fun, Piscium Chat has something for everyone. 
                            So why wait? Download the app and join the Piscium Chat community today!
                           </p>
                    </div>
                    
                </div>
            </div>
            <div className="explore">
                <h1>Explore the AR world </h1>
                <div className="exp exp-1">
                    <img src="1.jpg" alt="" />
                </div>
                <div className="exp exp-2">
                    <img src="2.jpg" alt="" />
                </div>
                <div className="exp exp-3">
                    <img src="3.jpg" alt="" />
                </div>
                <div className="exp exp-4">
                    <img src="4.jpg" alt="" />
                </div>
                <div className="exp exp-5">
                    <img src="5.jpg" alt="" />
                </div>
                <div className="exp exp-6">
                    <img src="6.jpg" alt="" />
                </div>
            </div>
        </section>
        <footer>
            <div className="footer_1">
                <div className="policy">
                    <ul>
                        <li>Private Policy</li>
                        <li>Data center</li>
                        <li>Info</li>
                    </ul>
                    <div className="socialsName">
                        <FontAwesomeIcon icon={faEnvelope} id="email"></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faInstagram} id="instagram" />
                        <FontAwesomeIcon icon={faTwitter} id="twitter" />
                        <FontAwesomeIcon icon={faLinkedin} id="linkedin"></FontAwesomeIcon>
                    </div>
                </div>
            </div>
            <div className="footer_2">
                <div className="copyRights">
                    <p><FontAwesomeIcon icon={faCopyright} className="copyrightIcon"></FontAwesomeIcon>Copyright Piscium Labs 2022</p>
                </div>
            </div>
        </footer>
    </div>


     );
}
 
export default Home;