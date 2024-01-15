import { useState } from 'react'
import {MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from '@chatscope/chat-ui-kit-react'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'

const API_KEY = import.meta.env.VITE_API_KEY;

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

//role: "user" -> message from the user
//"asssistant" -> response from ChatGPT 
//"system" -> one general message defining the behaviour of ChatGPT

const systemMessage = {
  role: "system",
  content: "Explain all contents like I am a beginner"
}

const apiRequestBody = {
  model : "gpt-3.5-turbo",
  messages: [
    systemMessage,
    ...apiMessages
  ]
}

 await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": "Bearer " + API_KEY,
    "Content-Type": "application/json",

  },
  body: JSON.stringify(apiRequestBody)
 }).then((data) => {
  return data.json();
 }).then((data) => {
  console.log(data);
  console.log(data.choices[0].message.content);
  setMessages(
    [...chatMessages, {
      message: data.choices[0].message.content,
      sender: "ChatGPT"
    }

    ]
  );
  setTyping(false)
 })

  }

  return (
    <div className="flex justify-center items-center">
      <div className='relative py-2 h-[96vh] w-[700px]'>
         <MainContainer>
          <ChatContainer>
            <MessageList
            typingIndicator={typing ? <TypingIndicator content="ChatBot is typing"/> : null}>
              {messages.map((message, i) => {
                return <Message key={i} model={message}/> 
              })}

            </MessageList>
            <MessageInput className='mb-0' placeholder='Type your message here... ' onSend={handleSend}/>
          </ChatContainer>
         </MainContainer>
      </div>

    </div>
  )
}

export default App;
