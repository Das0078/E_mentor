import React from 'react';
import { useParams } from 'react-router-dom';
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'

function Roompage() {
    const { roomId } = useParams();
    const myMeeting=(element)=>{
      const appID=201732039;
      const serverSecret="507396af99605619e996731987335064";
      const kitToken=ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        Date.now().toString(),'Rajat'
      )
      const zp=ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container:element,
        scenario:{
          mode:ZegoUIKitPrebuilt.VideoConference,
        }
      })
    }

    return (
        <div>

        <div ref={myMeeting}/>
        
        </div>
    );
}

export default Roompage;
