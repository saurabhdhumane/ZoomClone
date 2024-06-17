import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file

function Hoom() {
    const [roomID, setRoomID] = useState('');
    const navigate = useNavigate();

    const handleJoin = () => {
        if (roomID.trim()) {
            navigate(`/room/${roomID}`);
        }
    };

    const createNewRoom = () => {
        const newRoomID = generateRandomID(5);
        navigate(`/room/${newRoomID}`);
    };

    const generateRandomID = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    return (
        <div className="hoom-container">
            <h1>Welcome to  Saurabh Cloud Call</h1>
            <input
                type="text"
                placeholder="Enter Room ID"
                value={roomID}
                onChange={(e) => setRoomID(e.target.value)}
                className="input-field"
            />
            <div className="button-group">
                <button onClick={handleJoin} className="join-button">Join Room</button>
                <button onClick={createNewRoom} className="create-button">Create New Room</button>
            </div>
        </div>
    );
}

export default Hoom;
