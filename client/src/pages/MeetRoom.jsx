import React, { useContext, useEffect, useState } from 'react';
import '../styles/MeetPage.css';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import { config, useMicrophoneAndCameraTracks } from '../AgoraSetup';
import VideoPlayer from '../components/VideoPlayer';
import Controls from '../components/Controls';
import Participants from '../components/Participants';
import Chat from '../components/Chat';


const MeetRoom = () => {
  const { id } = useParams();
  const [roomName, setroomName] = useState('')

  // Get context values (tracks are no longer from context)
  const { socket, setInCall, client, users, setUsers, setStart, setParticipants, start } = useContext(SocketContext);

  // Initialize camera and microphone ONLY when this component mounts (entering the meeting)
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  const userId = localStorage.getItem("userId");

  // let useRtmChannel = null;
  useEffect(() => {
    // socket.emit('request-to-join-room', {userId, roomId: id});
    socket.emit('join-room', { userId, roomId: id });
    socket.on("user-joined", async () => {
      setInCall(true);
    });
    socket.emit('get-participants', { roomId: id });
    socket.on("participants-list", async ({ usernames, roomName }) => {
      setParticipants(usernames);
      setroomName(roomName);
    });

    // Cleanup: stop tracks when leaving the meeting
    return () => {
      if (tracks) {
        tracks.forEach(track => {
          if (track) {
            track.stop();
            track.close();
          }
        });
      }
    };
  }, [socket]);


  // const chan = useRtmChannel(rtmClient);
  // setMsgChannel(chan);


  useEffect(() => {
    let init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack.stop();
        }
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        socket.emit("user-left-room", { userId: user.uid, roomId: id });
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      try {
        await client.join(config.appId, name, config.token, userId);
      } catch (error) {
        console.log("error");
      }

      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);



    };


    if (ready && tracks) {
      try {
        init(id);
      } catch (error) {
        console.log(error);
      }
    }
  }, [id, client, ready, tracks]);




  return (

    <div className='meetPage'>

      <div className="meetPage-header">
        <h3>Meet: <span>{roomName}</span></h3>
        <p>Meet Id: <span id='meet-id-copy'>{id}</span></p>
      </div>



      <Participants />

      <Chat roomId={id} userId={userId} />


      <div className="meetPage-videoPlayer-container">

        {start && tracks ?
          <VideoPlayer tracks={tracks} users={users} />
          : ''
        }

      </div>

      <div className="meetPage-controls-part">

        {ready && tracks && (
          <Controls tracks={tracks} />
        )}

      </div>



    </div>
  )
}

export default MeetRoom;