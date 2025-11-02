import { Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ChatboxProps {
  props: {
    sendmsg: (message:string) => void;
    chats: { user: "user1" | "user2"; msg: string }[];
  };
}

export default function Chatbox({props:{sendmsg,chats}}:ChatboxProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const chatbottom = useRef<HTMLDivElement | null>(null)

  // Auto-resize textarea as content grows
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // reset height
      textarea.style.height = textarea.scrollHeight + "px"; // adjust to content
    } 
  }, [message]);

  useEffect(()=>{
    if(chatbottom.current)
    chatbottom.current.scrollIntoView({ behavior: 'smooth' })
  },[chats])
  

  return (
    <div className="flex flex-col items-center justify-between bg-[#F2F2F2] w-[350px] h-[90%] rounded-2xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <div className="flex flex-col gap-2 w-full h-full rounded-md overflow-scroll "
        style={{
        scrollbarWidth: "none"
        }}
        >
        {chats.map((e)=>{
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
        <div className="bg-white w-[95%] mb-2 flex items-center justify-between shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-xl">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            rows={1}
            className="resize-none overflow-hidden px-2 bg-white rounded-xl w-[85%] outline-none focus:ring-0 text-sm"
          />    
          <button className="flex items-center justify-center rounded-3xl bg-[#1F2224] w-fit text-xl px-3 py-2 scale-90 text-white"
          onClick={()=>sendmsg(message)}
          >
            <Send size={20} />
          </button>
        </div>
    </div>
  );
}
