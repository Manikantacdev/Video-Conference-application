import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socketIoClient from 'socket.io-client';
import { useClient } from '../AgoraSetup'


export const SocketContext = createContext();

const WS = 'https://video-conference-application.onrender.com';

const socket = socketIoClient(WS, {
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  upgrade: true,
  forceNew: true,
});



export const SocketContextProvider = ({ children }) => {

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [inCall, setInCall] = useState(false);
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  // Camera and mic tracks are now initialized in MeetRoom.jsx, not here
  // This prevents the camera from turning on when visiting the home page

  const [screenTrack, setScreenTrack] = useState(null);

  const [participants, setParticipants] = useState({});


  const [myMeets, setMyMeets] = useState([]);


  const [participantsListOpen, setParticipantsListOpen] = useState(false);
  const [chatsContainerOpen, setChatsContainerOpen] = useState(false);


  const [newMeetType, setNewMeetType] = useState('');

  useEffect(() => {
    // Socket connection event handlers for debugging
    socket.on('connect', () => {
      console.log('Socket connected successfully');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
    });

    socket.on('room-created', ({ roomId, meetType }) => {

      if (meetType === 'instant') {

        navigate(`/meet/${roomId}`);

      } else if (meetType === 'scheduled') {
        navigate(`/profile`);
      }

    });

    // Cleanup listeners on unmount
    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('room-created');
    };

  }, [socket]);



  return (
    <SocketContext.Provider value={{ myMeets, setMyMeets, newMeetType, setNewMeetType, participants, setParticipants, userId, socket, inCall, setInCall, screenTrack, setScreenTrack, client, users, setUsers, start, setStart, participantsListOpen, setParticipantsListOpen, chatsContainerOpen, setChatsContainerOpen }} >{children}</SocketContext.Provider>
  )
}



// export default socketContext
