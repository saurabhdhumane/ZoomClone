import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import './Room.css'

function Room() {
    const { roomID: paramRoomID } = useParams();
    const meetingContainer = useRef(null);

    const randomID = (len) => {
        let result = '';
        const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
        const maxPos = chars.length;
        for (let i = 0; i < len; i++) {
            result += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return result;
    };

    const getUrlParams = (url = window.location.href) => {
        let urlStr = url.split('?')[1];
        return new URLSearchParams(urlStr);
    };

    const sanitizeRoomID = (roomID) => {
        return roomID.replace(/[^a-zA-Z0-9]/g, '');
    };

    let roomID = paramRoomID || getUrlParams().get('roomID') || randomID(5);
    roomID = sanitizeRoomID(roomID);

    useEffect(() => {
        const myMeeting = async (element) => {
            try {
                // generate Kit Token
                const appID = 1198498640;
                const serverSecret = "baa5787d550119da5d4690fdcd0cb1ad";
                const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));

                // Create instance object from Kit Token
                const zp = ZegoUIKitPrebuilt.create(kitToken);
                // start the call
                zp.joinRoom({
                    container: element,
                    sharedLinks: [
                        {
                            name: 'Copy Personal link',
                            url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
                        },
                    ],
                    scenario: {
                        mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
                    },
                });
            } catch (error) {
                console.error("Failed to join the room:", error);
            }
        };

        if (meetingContainer.current) {
            myMeeting(meetingContainer.current);
        }
    }, [roomID]);

    return (
        <div>
            <h1>Room</h1>
            <div ref={meetingContainer}></div>
        </div>
    );
}

export default Room;
