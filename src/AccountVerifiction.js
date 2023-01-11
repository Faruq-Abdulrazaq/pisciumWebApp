import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";

const AccountVerification = () => {

    const location = useLocation()
    const history = useHistory()
    const [isSending, setIsSending] = useState(false);
    const [verificationCheck, setVerificationCheck] = useState(false);
    const [resendStatus, setResendStatus] = useState('');

    const {_id, email, fname} = location.state.data;

    const details = {
        email: email,
        fname: fname,
        _id: _id,
      };


    const handleResendLink = () => {
        setIsSending(true);
        const url = "https://drab-ruby-crane-belt.cyclic.app/user/resendVerificationLink";
        axios
          .post(url, details, {
            headers: { "Content-Type": "application/json" },
          })
          .then((response) => {
            const result = response.data;
            const { message, status } = result;
    
            if (status !== "PENDING") {
                setResendStatus('failed');
                const displayError = document.getElementById('errorMessage');
                displayError.innerHTML = message;
                displayError.style.display = 'inline-grid';
            } else {
                const displayError = document.getElementById('errorMessage');
                displayError.innerHTML = message;
                displayError.style.display ='inline-grid';
            }
            setIsSending(true);
          })
          .catch((error) => {
            setResendStatus('failed');
              const displayError = document.getElementById('errorMessage');
                displayError.innerHTML = "An error occured";
                displayError.style.display ='inline-grid';
          });
    }

    const confirmVerification = () => {
        setVerificationCheck(true);
        const displayError = document.getElementById('errorMessage');
        displayError.style.display = 'none';
        const url = "https://drab-ruby-crane-belt.cyclic.app/user/confirmVerification";
        axios
          .post(url, details, {
            headers: { "Content-Type": "application/json" },
          })
          .then((response) => {
            const result = response.data;
            const { message, status, state } = result;
    
            if (status === "PENDING") {
                setResendStatus('failed');
                setVerificationCheck(false);
                const displayError = document.getElementById('errorMessage');
                displayError.innerHTML = message;
                displayError.style.display = 'inline-grid';
            } else {
                return history.push({
                    pathname : '/arroom',
                    state: state ,
                });
            }
            setIsSending(true);
          })
          .catch((error) => {
            setResendStatus('failed');
              const displayError = document.getElementById('errorMessage');
                displayError.innerHTML = "An error occured";
                displayError.style.display ='inline-grid';
          });
    }

    return ( 
        <div className="verificationHome">
            <header>
                <div className="aboutHeader">
                    <div className="aboutLogo">
                        <img src="https://i.ibb.co/W0dYYbc/Piscium-Icon-White2.png" className="aboutLogo_img_1" alt="logo1"/>
                        <img src="https://i.ibb.co/mSF7RHG/Piscium-Labs-Name-White.png" className="aboutLogo_img_2" alt="logo2" />
                    </div>
                    <div className="navigation">
                        <ul className="navigation_ul">
                            <li>Product</li>
                            <li>Business</li>
                            <li><Link to="/about" id="LinkWhite">About</Link></li>
                        </ul>
                    </div>
                </div>
            </header>

            <div className="main-content">
                <h1>Account Verification</h1>
                <h4 className="login-form-h4" id="errorMessage">-</h4>
                <h3>We have sent a verification link to {email}.<br/> Open the link on a browser to continue</h3>
                { verificationCheck ? <button type="button" className="main-content-False-button" disabled onClick={confirmVerification}>........</button>  :
                   <button type="button" className="main-content-button" onClick={confirmVerification}>I have verified my account</button>
                  }
                <br/>
                { isSending ? <h5>Resend verification link in ...</h5> : 
                 <button type="button" className="main-content-button " onClick={handleResendLink}>Resend verification link</button>
                }
                
            </div>
        </div> 
        );
}
 
export default AccountVerification;