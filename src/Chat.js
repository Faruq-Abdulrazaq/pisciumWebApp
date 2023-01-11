import { useEffect, useLayoutEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faGem } from "@fortawesome/free-solid-svg-icons";

const firebaseConfig = {
    apiKey: "AIzaSyAvHg08fjZUQ62WxVO9k5sAHRHl6CUCZ48",
    authDomain: "pisciumweb.firebaseapp.com",
    projectId: "pisciumweb",
    storageBucket: "pisciumweb.appspot.com",
    messagingSenderId: "693293415887",
    appId: "1:693293415887:web:cc696cfa3b493b62cf26ba"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const Chat = () => {
    const history = useHistory();
    const location = useLocation();
    const [chatText, setChatText] = useState('');
    const [messages, setMessages] = useState([]);

    // if (location.state) {
    //     const {_id, email, fname} = location.state.data;
    // } else {
    //     return history.push({
    //         pathname : '/',
    //     });
    // }

    useEffect (() => {
        var elem = document.getElementById('scroll');
        elem.scrollTop = elem.scrollHeight;
    }, [messages])

    
    const {_id, email, fname} = location.state.data;
    
    function randomStr(len, arr) {
        var ans = "";
        for (var i = len; i > 0; i--) {
          ans += arr[Math.floor(Math.random() * arr.length)];
        }
        return ans;
      }

    function stopScroll() {
        window.clearInterval()
    }


    useLayoutEffect(() => {
        const unsubscribe = db
        .collection(_id)
        .orderBy("createdAt", "asc")
        .onSnapshot((snapshot) =>
            setMessages(
            snapshot.docs.map((doc) => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
            }))
            )
        );
        return unsubscribe;
    }, [])
 
        
    const api = (userMessage) => {
        const url = `https://fastapi-production-5c2a.up.railway.app/chat?userInput=${userMessage}&myUsername=${fname}`;
        axios
        .get(url, {
            headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
            const result = response.data;
            db.collection(_id).add({
                _id: randomStr(36, "12345abcde"),
                createdAt: new Date(),
                text: result,
                user: {
                    _id: 'bot@piscium.com',
                    avatar: "https://i.ibb.co/Y8FXLZM/gabriel-s.jpg",
                    name: 'Gabriel',
                }
            })

        })
    }

    const visitRoom = () => {
        history.push({
            pathname : '/arroom',
            state: location.state,
        });
    }

    const handelChat = (e) => {
        e.preventDefault();
        const userMessage = chatText;
        setChatText('');

        db.collection(_id).add({
            _id: randomStr(36, "12345abcde"),
            createdAt: new Date(),
            text: userMessage,
            user: {
            _id : email,
            avatar: "https://i.ibb.co/Y8FXLZM/gabriel-s.jpg",
            name : fname
            }
        })
        api(userMessage);
    }
   
    
    return ( 
        <div className="chatHome">
            <div className="chatBox">
                <div className="chatArea" id="scroll" onFocus={stopScroll}>
                        {messages.map((message) => (
                            message.user._id !== 'bot@piscium.com' ? (
                            <div className="sent" key={message._id}>
                                <div>{message.text} <br /><span className="sentTime">{message.createdAt.getHours() + ":" + message.createdAt.getMinutes()}</span></div>
                            </div> 
                            ) : <div className="recived" key={message._id}>
                                    <div>{message.text} <br /><span className="sentTime">{message.createdAt.getHours() + ":" + message.createdAt.getMinutes()}</span></div>  
                                </div>
                        ))}
                      
                </div>


                <div className="typeArea">
                    <div className="startChat">
                        <div className="suggestions">
                            <button type="button">What is the time</button>
                            <button type="button">Tell me a joke</button>
                            <button type="button">Gossip</button>
                            <button type="button" onClick={() => visitRoom()}>Visit Room</button>
                        </div>
                        <div className="chat">
                            <button className="call" type="submit" onClick={handelChat}> <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon></button>
                            <form action="">
                                <input type="text" value={chatText} onChange={(e) => setChatText(e.target.value)} placeholder="Type something" />
                                {chatText ? <button className="send" type="submit" onClick={handelChat}> <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon></button> : null}
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="others" id="scroll">
                <div className="store">
                    <section className="othersHeader">
                        <div className="storeHeader">
                            <h3>Store</h3>
                            <h5>See more</h5>
                        </div>
                        <div className="storeDiv">
                            <div className="storeTemplate">
                                <img src="1.jpg" alt="storeItem" />
                                <p> <span><FontAwesomeIcon className="gem" icon={faGem} /></span>500</p>
                            </div>
                            <div className="storeTemplate">
                                <img src="2.jpg" alt="storeItem" />
                                <p> <span><FontAwesomeIcon className="gem" icon={faGem} /></span>50</p>
                            </div>
                        </div>

                    </section>

                </div>
                <div className="diary">
                    <section className="othersHeader">
                        <div className="diaryHeader">
                            <h3>Diary</h3>
                            <h5>See more</h5>
                        </div>
                        <div className="diaryTemplate">
                            <textarea name="" id="" cols="30" rows="10"></textarea>
                            <button>Save</button>
                        </div>
                    </section>
                </div>
                <div className="notes">
                    <section className="othersHeader">
                        <div className="notesHeader">
                            <h3>Notes</h3>
                            <h5>See more</h5>
                        </div>
                        <div className="notesDiv">
                            <div className="notesTemplate">
                                <p>Diary</p>
                                <p> 
                                    Piscium Labs Kris
                                </p>
                            </div>
                            <div className="notesTemplate">
                                <p>Diary</p>
                                <p> 
                                    Zach is a great guy.
                                </p>
                            </div>
                        </div>
                    </section>

                </div>
                <div className="memory">
                    <section className="othersHeader">
                        <div className="memoryHeader">
                            <h3>Memory</h3>
                            <h5>See more</h5>
                        </div>
                        <div className="memoryBox">
                            <div className="memoryTemplate">
                                <h5>Henry Danger</h5>
                                <p>Ask Ray his birthday</p>
                            </div>
                            <div className="memoryTemplate">
                                <h5>English Premier League</h5>
                                <p>Chelsea to win the title</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
     );
}
 
export default Chat;