import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useLocation } from "react-router-dom";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import SpeechRecognition, {
    useSpeechRecognition
  } from "react-speech-recognition";
import { useSpeechSynthesis } from 'react-speech-kit';  

const ArRoom = () => {
    const history = useHistory();
    const location = useLocation();
    const {_id, email, fname} = location.state.data;
    const [text,setText] = useState('');
    const {speak} = useSpeechSynthesis();
    const { transcript, resetTranscript } = useSpeechRecognition({
        continuous: true
      });
    
      if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null;
      }
    console.log(location.state)  
      
    const handleOnClick = () => {
        speak({text:text})
      }

    const backToChat = () => {
        history.push({
            pathname : '/chat',
            state: location.state,
        });
    }

    return ( 
        <div className="arRoom">
            <section className="arHeader">
                <div className="back">
                    <button onClick={() => backToChat()}>
                        <FontAwesomeIcon icon={faHouse} className="homePage" />
                    </button>
                </div>
                <div className="functions">
                    <div className="functionsIcon">
                        <FontAwesomeIcon className="music" icon={faMusic} />
                    </div>
                    <div className="functionsIcon">
                        <button onClick={SpeechRecognition.startListening}>
                            <FontAwesomeIcon className="play" icon={faPlay} />
                        </button>
                    </div>
                    <div className="functionsIcon">
                        <FontAwesomeIcon className="gear" icon={faGear} />
                    </div>
                </div>
            </section>
            <section className="arBody">
                {/* <h1>{transcript}</h1>
                
                <textarea className="textAreaStyle" onChange={(e)=>{setText(e.target.value)}}></textarea>
                <button className="buttonStyle" onClick={()=>{handleOnClick()}}>Listen</button> */}
            </section>
            
        </div>
     );
}
 
export default ArRoom;