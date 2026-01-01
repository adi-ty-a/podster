import { Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { webrtcmanager } from "../webrtc/rtcmanager";
import { rtcengine } from "../webrtc/connectionlogic";

interface chats{
  user:"user1"|"user2",
  msg:string
}

export default function Chatbox() {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const chatbottom = useRef<HTMLDivElement | null>(null);
  const [manager,setmanager]= useState<webrtcmanager|undefined>(undefined);
  const [chats,setchats]=useState<chats[]>([]);
  // Auto-resize textarea as content grows

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // reset height
      textarea.style.height = textarea.scrollHeight + "px"; // adjust to content
    } 
  }, [message]);

  useEffect(()=>{
    setmanager(()=> rtcengine())
  },[])

  useEffect(()=>{
      const messagemanager=()=>{
        manager?.server.on("msg",(data)=> {
          console.log('yo boy')
          console.log(data);
        setchats((prev:chats[])=> [...prev,{user:"user2",msg:data}])
          })
      }
    if(manager){
      messagemanager();
    }
  },[manager])
  
  return (
    <div className="flex flex-col bg-white w-[30%]  min-w-[300px] h-full border-l">
      <div className="text-2xl pl-6 py-4 border-b">
      Chat
      </div>
      {/* Chatbox */}
      <div className="flex flex-1 flex-col gap-2 w-full h-full overflow-scroll  "
        style={{
        scrollbarWidth: "none"
        }}
        >
        {chats && chats.map((e)=>{
          if(e.user == 'user1'){
          return<>
        <div className="ml-auto mr-3 px-4 py-2 bg-white w-fit max-w-[70%] rounded-2xl shadow-[0px_1px_8px_-3px_rgba(0,_0,_0,_0.1)]">
            {e.msg}
        </div>
          </>
          }else{
            return <div className="ml-3 px-4 py-2 bg-[#1F2224] text-white w-fit max-w-[70%] rounded-2xl shadow-[0px_1px_8px_-3px_rgba(0,_0,_0,_0.1)]">
            {e.msg}
        </div>
          }
        })}
        <div ref={chatbottom} ></div>
        </div>
        {/* Input box */}
        <div className="w-full border-t py-4 flex items-center justify-around ">
          <div className="bg-[#f7f7f7] h-10 w-[80%] flex items-center justify-between shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-md">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              rows={1}
              className="resize-none overflow-hidden px-2 bg-[#f7f7f7] rounded-xl w-[85%] outline-none focus:ring-0 text-sm"
              />    
          </div>
            <button className="flex items-center justify-center rounded-lg bg-[#1F2224] w-fit text-xl px-3 py-3 scale-90 text-white"
            onClick={()=>{
              if(manager)
                manager.sendmsg(message)
              setchats((prev:chats[])=> [...prev,{user:"user1",msg:message}])
            }}
            >
              <Send size={20} />
            </button>
        </div>
    </div>
  );
}