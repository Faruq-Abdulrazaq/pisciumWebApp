import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Login = () => {
    const location = useLocation();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inMessage, setInMessage] = useState('');
    const [isSubmiting, setIsSubmiting] = useState(false);


    useEffect(() => {
        if (location.state) {
            const { email } = location.state.data;
            const { prevPath } = location.state;
            setEmail(email);
            setInMessage('Password changed successfully');
            if (prevPath === "/resetpassword") {
                window.history.pushState(null, document.title, window.location.href);
                window.addEventListener('popstate', function(event) {
                    window.history.pushState(null, this.document.title, window.location.href)
                });
            }
        }
    }, [])



    const handleLogin = (e) => {
        setIsSubmiting(true)
        e.preventDefault();
        const displayError = document.getElementById('errorMessage');
        displayError.style.display ='none';
        const credentials =  {email, password}  
        const url = "https://drab-ruby-crane-belt.cyclic.app/user/signin";

        axios
          .post(url, credentials, {
            headers: { "Content-Type": "application/json" },
          })
          .then((response) => {
            const result = response.data;
            const { message, status, state } = result;
            console.log(state)


            if (status === "PENDING") {
                return history.push({
                    pathname : '/accountVerification',
                    state: state,
                });
            } else if (status !== "SUCCESS") {
                const displayError = document.getElementById('errorMessage');
                displayError.innerHTML = message;
                displayError.style.display ='inline-grid';
            } else {
                return history.push({
                    pathname : '/arroom',
                    state: state,
                });
            }
            setIsSubmiting(false);
          })
          .catch((error) => {
              setIsSubmiting(false);
              const displayError = document.getElementById('errorMessage');
                displayError.innerHTML = "An error occured";
                displayError.style.display ='inline-grid';
          });
    }

    return ( 
    <div className="login-page">
        <div className="login-page-left">
            <div className="pslogo">
                <img src="https://i.ibb.co/W0dYYbc/Piscium-Icon-White2.png" className="pslogo_img_1" alt="logo1" />
                <img src="https://i.ibb.co/mSF7RHG/Piscium-Labs-Name-White.png" className="pslogo_img_2" alt="logo2"/>
            </div>
            <div className="infomation">
                <h1>An AI companion who is eager to learn and would love to see the world through your eyes. </h1>
                    <p>
                        In addition to our customizable avatars, Piscium Chat also features a variety of
                         virtual environments for you to explore and interact with. From bustling city streets to tranquil forests
                         , there's always something new to discover.
                    </p>
            </div>
            <div className="footer_login">
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
        </div>
        <div className="login-page-right">
            <h3>WELCOME BACK</h3>
            
            <h4>Login to Piscium</h4>

            <div className="login-box">
                <form onSubmit={handleLogin} className="login-form">
                { inMessage ?  <h4 className="login-form-h4-success" id="successMessage">{inMessage}</h4> : null }
                <h4 className="login-form-h4" id="errorMessage">-</h4>
                    <input 
                        required
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        required
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                    <h4><Link to="resetaccount" className="goLink">Forgot password?</Link ></h4>
                    {isSubmiting ? <button type="submit" className="next-btn-loading" disabled>Loading...</button> : <button type="submit" className="next-btn">Next</button>}
                    
                    <h4>New to Piscium? <Link to="signup" className="goLink">Sign up</Link ></h4>
                </form>
            </div>
        </div>
    
    </div> 
    );
}
 
export default Login;