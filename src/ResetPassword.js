import axios from "axios";
import { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

const ResetPassword = () => {
    const location = useLocation();
    const history = useHistory();
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [newPassword, setNewPassword] = useState("")

    if (!location.state) {
        return history.push({
            pathname : '/',
        });
    } 

    const {email, expireAt, code} = location.state;



    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmiting(true);
        
        const credentials =  {email, expireAt, code, newPassword}  
        const url = "https://drab-ruby-crane-belt.cyclic.app/user/changePassword";

        axios
          .post(url, credentials, {
            headers: { "Content-Type": "application/json" },
          })
          .then((response) => {
            const result = response.data;
            const { message, status, data } = result;
    
            if (status === "SUCCESS") {
                return history.push({
                    pathname : '/login',
                    state: {data : data[0], prevPath: location.pathname },
                });
            } else {
                const displayError = document.getElementById('errorMessage');
                displayError.innerHTML = message;
                displayError.style.display ='inline-grid';
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
        <div className="ResetPasswordBox">
            <form action="" onSubmit={handleSubmit}>
                <h3>Enter new password</h3>
                <h4 className="login-form-h4" id="errorMessage">-</h4>
                <input 
                    required
                    type="password" 
                    name="" 
                    id="" 
                    value={newPassword}
                    placeholder="Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                {isSubmiting ? <button disabled style={{ opacity: 0.7 }}>Update...</button> : <button type="submit">Update</button>}
                
            </form>
        </div>
     );
}
 
export default ResetPassword;