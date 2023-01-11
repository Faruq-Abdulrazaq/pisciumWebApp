import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";



const ForgotPassword = () => {
    const [email, setEmail] = useState();
    const [datas, setDatas] = useState([]);
    const [dbCode, setDbCode] = useState();
    const [code, setCode] = useState('');
    const [isSubmiting, setIsSubmiting] = useState(false);
    const history = useHistory();


    useEffect(() => {
        if ( code.length > 1) {
            if(code !== dbCode) {
                const displayError = document.getElementById('errorMessage');
                displayError.innerHTML = "Invaild code";
                displayError.style.display ='inline-grid';
            } else {
                return history.push({
                    pathname : '/resetpassword',
                    state: datas,
                });
             }
            }
    
    }, [code])

    const hideShow = () => {
        const enterCode = document.getElementById('enterCode');
        const resetBox = document.getElementById('resetBox');
        resetBox.style.display = 'flex';
        enterCode.style.display = 'none';
    }

    const handleReset = (e) => {
        e.preventDefault();
        setIsSubmiting(true);

        const credentials =  {email}  
        const url = "https://drab-ruby-crane-belt.cyclic.app/user/resetAccount";

        axios
        .post(url, credentials, {
            headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
            const result = response.data;
            const { message, status, data } = result;
            if (status !== "PENDING") {
                const displayError = document.getElementById('errorMessage');
                displayError.innerHTML = message;
                displayError.style.display ='inline-grid';
            } else if (data.expireAt < Date.now()) {
                const displayError = document.getElementById('errorMessage');
                displayError.innerHTML = "Verification code has expired";
                displayError.style.display ='inline-grid';
            } else {
                setDbCode(data.code);
                setDatas(data);
                const enterCode = document.getElementById('enterCode');
                const resetBox = document.getElementById('resetBox');
                resetBox.style.display = 'none';
                enterCode.style.display = 'flex';
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
        <div className="reset">
            <div className="resetBox" id="resetBox">
                <h3>Reset your password</h3>
                <h4 className="login-form-h4" id="errorMessage">-</h4>
                <form onSubmit={handleReset}>
                    <input 
                        required 
                        value={email}
                        placeholder="Email address"                       
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {isSubmiting ? <button disabled style={{ opacity: 0.7 }}>Reset.... </button> : <button type="submit">Reset</button>}
                    
                </form>
            </div>
            <div className="enterCode" id="enterCode">
            <h3>We sent a code to {email}.</h3>  
            <h5><Link onClick={hideShow}>Edit email</Link >-</h5>
                <h4 className="login-form-h4" id="errorMessage"></h4>
                <form>
                    <input 
                        type="number" 
                        name="" 
                        id=""
                        placeholder="Enter code sent to your email"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </form>
                <button className="resendBtn">Resend Email</button>
            </div>
        </div>
     );
}
 
export default ForgotPassword;