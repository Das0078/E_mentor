import React from 'react'
import { App as SendBirdApp } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";

function Chat() {

  return (
    <div>
    <SendBirdApp
        // Add the two lines below.
        appId='D3B4D7BA-A760-4C26-8B9D-9197824F9EAE'    // Specify your Sendbird application ID.
        userId='User 2'  // Specify your user ID.
    />
</div>
  )
}

export default Chat