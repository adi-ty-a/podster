"use client"
import { useState } from "react";
import LandingNav from "../components/LandingpageNavbar"
export default function About(){
      const [show, setclose] = useState(false);
    return <div className="w-screen h-screen bg-[#FAFDFF]">
        <LandingNav menuboxclose={setclose}>
             <div className="cursor-pointer text-[14px] text-[#898989] font-semibold" >Home</div>
        </LandingNav>
        <div>
            ## About Podster

### Conversations worth recording should be easy to capture.

Podster was built around a simple idea: **recording a great conversation shouldn't require a complicated setup.**

Whether you're recording a podcast, interviewing a guest, creating content, or simply having an important conversation, Podster gives you a simple place to connect, record, and share.

No complicated production workflow. No unnecessary tools. Just create a room, invite someone, and start talking.

### Built for conversations, not production headaches.

We believe the best conversations happen when you're focused on the person you're talking to — not the software you're using.

That's why we're building Podster to make recording feel as natural as having a conversation itself.

**Connect. Record. Share.**

That's Podster.

        </div>
    </div>
}