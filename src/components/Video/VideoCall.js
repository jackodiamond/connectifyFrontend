import React, { useRef, useEffect } from "react";
import io from "socket.io-client";
import HomeScreen from "../Home/HomeScreen";
import Button from "@material-ui/core/Button"
import "./VideoCall.css"


const Room = (props) => {
    const userVideo = useRef();
    const partnerVideo = useRef();
    const peerRef = useRef();
    const socketRef = useRef(null);
    const otherUser = useRef();
    const userStream = useRef();
    const callAccepted = useRef(false);
   


    useEffect(() => {
        if(socketRef.current===null)
        {
          socketRef.current = io('https://connectify-backend.notionxr.com/'); 
          socketRef.current.emit("video", "username");
        }

        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
            userVideo.current.srcObject = stream;
            userStream.current = stream;

            

            
            
            socketRef.current.on('callIt', data => {
                console.log("data : ",data.roomId)
                socketRef.current.emit("joinroom", data.roomId);
            });
            

            socketRef.current.on('other user', userID => {
                console.log("other user joined!")
                callAccepted.current =true;
                callUser(userID);
                otherUser.current = userID;

            });

            socketRef.current.on("user joined", userID => {
                console.log("user joined!")
                otherUser.current = userID;
            });

            socketRef.current.on("offer", handleRecieveCall);

            socketRef.current.on("answer", handleAnswer);

            socketRef.current.on("ice-candidate", handleNewICECandidateMsg);
        });

    }, []);

    function callUser(userID) {
        peerRef.current = createPeer(userID);
        userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
    }

    function createPeer(userID) {
        const peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.stunprotocol.org"
                },
                {
                    urls: 'turn:numb.viagenie.ca',
                    credential: 'muazkh',
                    username: 'webrtc@live.com'
                },
            ]
        });

        peer.onicecandidate = handleICECandidateEvent;
        peer.ontrack = handleTrackEvent;
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

        return peer;
    }

    function handleNegotiationNeededEvent(userID) {
        peerRef.current.createOffer().then(offer => {
            return peerRef.current.setLocalDescription(offer);
        }).then(() => {
            const payload = {
                target: userID,
                caller: socketRef.current.id,
                sdp: peerRef.current.localDescription
            };
            socketRef.current.emit("offer", payload);
        }).catch(e => console.log(e));
    }

    function handleRecieveCall(incoming) {
        peerRef.current = createPeer();
        const desc = new RTCSessionDescription(incoming.sdp);
        peerRef.current.setRemoteDescription(desc).then(() => {
            userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
        }).then(() => {
            return peerRef.current.createAnswer();
        }).then(answer => {
            return peerRef.current.setLocalDescription(answer);
        }).then(() => {
            const payload = {
                target: incoming.caller,
                caller: socketRef.current.id,
                sdp: peerRef.current.localDescription
            }
            socketRef.current.emit("answer", payload);
        })
    }

    function handleAnswer(message) {
        const desc = new RTCSessionDescription(message.sdp);
        peerRef.current.setRemoteDescription(desc).catch(e => console.log(e));
    }

    function handleICECandidateEvent(e) {
        if (e.candidate) {
            const payload = {
                target: otherUser.current,
                candidate: e.candidate,
            }
            socketRef.current.emit("ice-candidate", payload);
        }
    }

    function handleNewICECandidateMsg(incoming) {
        const candidate = new RTCIceCandidate(incoming);

        peerRef.current.addIceCandidate(candidate)
            .catch(e => console.log(e));
    }

    function handleTrackEvent(e) {
        if(partnerVideo.current)
        {
            partnerVideo.current.srcObject = e.streams[0];
        }
    };

    function disconnectCall() {
        if (peerRef.current) {
            peerRef.current.close();
        }
        callAccepted.current=false
        socketRef.current.emit("nextVideo");
        // Additional cleanup if needed
    }

    return (
            <>
                    
            <div className="container">
            <HomeScreen />



            <header className="chat-header">
            <img src="https://via.placeholder.com/150" alt="User Avatar" />
            <h2>Friend Name</h2>
            </header>

                  


                    <div >
                    
                    <img src="/giphy.gif" alt="Example GIF" className="video-other" />

                        <video  ref={partnerVideo} autoPlay  className="video-other"/>:

                        
                       
                        
                    </div> 

                    <div >
                       
                       <video  ref={userVideo} autoPlay className="video-self"/>
                       
                    </div>
                   

                    

                <div className="next">
                    <Button onClick={disconnectCall}>
                        Next 
                    </Button>
                </div>

            </div>

            </>
    );
};

export default Room;