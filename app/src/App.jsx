import { useState } from 'react'
import {MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from '@chatscope/chat-ui-kit-react'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'

const API_KEY = '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';

function App() {

  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am ChatGPT",
      sender: "ChatGPT"
    }
  ])

  const handleSend = async (message) => {
    const newMessage = {
      message : message ,
      sender : "user",
      direction : "outgoing"
    }
  

  const newMessages = [...messages, newMessage] //contains all the old and new messages

  //update our message state
  setMessages(newMessages)

//setting a typing indicator(chatGPT is typing)
  setTyping(true) 
  //send it to ChatGPT and get response
  await processMessageTOChatGPT(newMessages)
  }

  async function processMessageTOChatGPT(chatMessages){

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if(messageObject.sender == "ChatGPT"){
        role = "assistant"
      } else{
        role ="user"
      }
      return{role: role, content : messageObject.message}
    });

    
  }

  return (
    <div className="App">
      <div className='relative h-[800px] w-[700px] '>
         <MainContainer>
          <ChatContainer>
            <MessageList
            typingIndicator={typing ? <TypingIndicator content="ChatBot is typing"/> : null}>
              {messages.map((message, i) => {
                return <Message key={i} model={message}/> 
              })}

            </MessageList>
            <MessageInput placeholder='Type your message here...' onSend={handleSend}/>
          </ChatContainer>
         </MainContainer>
      </div>

    </div>
  )
}

export default App;
