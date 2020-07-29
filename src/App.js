import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import './App.css';
import { FormControl,Input} from '@material-ui/core';
import Message from './Message';
import db from './Firebase';
import FlipMove from 'react-flip-move';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { IconButton } from '@material-ui/core';

function App() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id , message: doc.data()})));
    })
  }, []);

  useEffect(() => {
    setUsername(prompt('Enter your name'));
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    //setMessages([...messages, {username: username, message: input}]);
    setInput('');
  }

  return (
    <div className="App">
      <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIKdmlld0JveD0iMCAwIDUwIDUwIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxwYXRoIGQ9Ik0gMjUgMiBDIDEyLjM0NzY1NiAyIDIgMTEuNTk3NjU2IDIgMjMuNSBDIDIgMzAuMDA3ODEzIDUuMTMyODEzIDM1Ljc4NTE1NiAxMCAzOS43MTg3NSBMIDEwIDQ4LjY1NjI1IEwgMTEuNDY4NzUgNDcuODc1IEwgMTguNjg3NSA0NC4xMjUgQyAyMC43MDMxMjUgNDQuNjY0MDYzIDIyLjgwMDc4MSA0NSAyNSA0NSBDIDM3LjY1MjM0NCA0NSA0OCAzNS40MDIzNDQgNDggMjMuNSBDIDQ4IDExLjU5NzY1NiAzNy42NTIzNDQgMiAyNSAyIFogTSAyNSA0IEMgMzYuNjQ0NTMxIDQgNDYgMTIuNzU3ODEzIDQ2IDIzLjUgQyA0NiAzNC4yNDIxODggMzYuNjQ0NTMxIDQzIDI1IDQzIEMgMjIuODM1OTM4IDQzIDIwLjc0MjE4OCA0Mi42ODc1IDE4Ljc4MTI1IDQyLjEyNSBMIDE4LjQwNjI1IDQyLjAzMTI1IEwgMTguMDYyNSA0Mi4yMTg3NSBMIDEyIDQ1LjM3NSBMIDEyIDM4LjgxMjUgTCAxMS42MjUgMzguNTMxMjUgQyA2Ljk2MDkzOCAzNC45NDE0MDYgNCAyOS41MzkwNjMgNCAyMy41IEMgNCAxMi43NTc4MTMgMTMuMzU1NDY5IDQgMjUgNCBaIE0gMjIuNzE4NzUgMTcuNzE4NzUgTCAxMC42ODc1IDMwLjQ2ODc1IEwgMjEuNSAyNC40MDYyNSBMIDI3LjI4MTI1IDMwLjU5Mzc1IEwgMzkuMTU2MjUgMTcuNzE4NzUgTCAyOC42MjUgMjMuNjI1IFoiPjwvcGF0aD48L3N2Zz4="/>
      <h1>DARK MESSENGER</h1>
      <h2>Welcome {username}</h2>
      <form className='app__form'>
      <FormControl className="app__formcontrol">
        <Input className='app__input' placeholder='Enter a message...' value={input} onChange={event => setInput(event.target.value)}/>
        <IconButton className='app__iconButton' disabled={!input} variant='contained' color='primary' type='submit' onClick={sendMessage}>
          <SendRoundedIcon />
        </IconButton>

       {/* <Button disabled={!input} variant='contained' color='primary' type='submit' onClick={sendMessage}> Send Message </Button> */}
      </FormControl>
      </form>

      <FlipMove>
      {
        messages.map(({id, message}) => (
          <Message key={id} username={username} message={message}/>
        ))
      }
      </FlipMove>
    </div>
  );
}

export default App;
