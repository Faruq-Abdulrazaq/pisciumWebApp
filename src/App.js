import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Chat from './Chat';
import AccountVerification from './AccountVerifiction';
import Home from "./Home";
import Login from "./Login";
import NotFound from './NotFound';
import Signup from "./Signup";
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import ArRoom from './ArRoom';
import About from './About';


const App = () => {
    return ( 
        <Router>
            <div id="content">
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/signup">
                    <Signup />
                </Route>
                <Route path="/accountverification">
                    <AccountVerification />
                </Route>
                <Route path="/arroom">
                    <ArRoom />
                </Route>
                <Route path="/chat">
                    <Chat />
                </Route>
                <Route path="/resetaccount">
                    <ForgotPassword />
                </Route>
                <Route path="/resetpassword">
                    <ResetPassword />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
            </div>
        </Router>
     );
}
 
export default App;