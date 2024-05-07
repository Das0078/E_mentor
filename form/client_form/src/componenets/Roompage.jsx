import React from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import "./Room.css"

function Roompage() {
    const { roomId } = useParams();

    // Function to initialize Zego UI Kit
    const initializeZegoUIKit = (element) => {
        const appID = 201732039;
        const serverSecret = "507396af99605619e996731987335064";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomId,
            Date.now().toString(),
            'Rajat'
        );
        const zegoUIKit = ZegoUIKitPrebuilt.create(kitToken);
        zegoUIKit.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            }
        });
    }

    return (
        <div className="room-container">
            <header className="header">
                <h1>Room {roomId}</h1>
            </header>
            <div className="video-container" ref={initializeZegoUIKit}></div>
        </div>
    );
}

export default Roompage;
