import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";


const Signup = () => {

    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [isSubmiting, setIsSubmiting] = useState(false);
    const history = useHistory();

    const handleSignup = (e) => {
        setIsSubmiting(true)
        e.preventDefault();
        if (gender === "") {
            const displayError = document.getElementById('errorMessage');
                    displayError.innerHTML = "Select a gender";
                    displayError.style.display ='inline-grid';
        } else {
            const credentials =  {fname, lname, email, password, gender}  
            const url = "https://drab-ruby-crane-belt.cyclic.app/user/signup";

            axios
            .post(url, credentials, {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                const result = response.data;
                const { message, status } = result;
                console.log(result);
                if (status !== "PENDING") {
                    const displayError = document.getElementById('errorMessage');
                    displayError.innerHTML = message;
                    displayError.style.display ='inline-grid';
                } else {
                    return history.push({
                        pathname : '/accountVerification',
                        state: result,
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
        
    }

    

    return ( 
        <div className="signup">
            <div className="pslogo_signup">
                <img src="https://i.ibb.co/W0dYYbc/Piscium-Icon-White2.png" className="pslogo_signup_img_1" alt="logo1" />
                <img src="https://i.ibb.co/mSF7RHG/Piscium-Labs-Name-White.png" className="pslogo_signup_img_2" alt="logo2" />
            </div>
            <div className="signup-box">
                <h2>Sign up to Piscium </h2>
                <h4 className="login-form-h4" id="errorMessage">-</h4>
                <form onSubmit={handleSignup} method="post" className="form-signup">
                    <input
                        required
                        type="text"  
                        placeholder="First Name"
                        value={fname}
                        onChange={(e) => setfname(e.target.value)}
                    />
                    <input 
                        required
                        type="text" 
                        placeholder="Last Name"   
                        value={lname}
                        onChange={(e) => setlname(e.target.value)}  
                    />
                    <input 
                        required
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Email"     
                    />
                    <input 
                        required
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <h3>Gender
                        ({gender})</h3>
                    <div className="gender">
                        <button 
                            type="button" 
                            className="male" 
                            value='male' 
                            onClick={() => setGender('male')}
                        >Male</button>
                        <button 
                            type="button" 
                            className="female" 
                            value='female'
                            onClick={() => setGender('female')}
                        >Female</button>
                    </div>
                    <h5>By creating an account you agree to our <Link to="#" className="goLink_signup">Terms of Service</Link > and <Link to="#" className="goLink_signup">Privacy Policy</Link >.</h5>
                    {isSubmiting ? <button type="submit" disabled className="continue-btn-loading">Continue...</button> :
                    <button type="submit" className="continue-btn">Continue</button> }
                    <h4>Already have an account? <Link to="/login" className="goLink_signup">Login</Link ></h4>

                </form>
            </div>

        </div>
     );
}
 
export default Signup;