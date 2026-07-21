  //  const renderRemoteVideo = () => {
  //       if (!userconnected) {
  //         return "User not connected...";
  //       }

  //       if (!isRemoteVideoEnabled) {
  //         return (
  //           <div className=" relative h-full w-full flex items-center justify-center">
  //                   <video  className="w-full h-full object-cover" autoPlay ref={remotevid} id="remote" ></video>
  //                   <div className="absolute w-full h-full flex items-center justify-center bg-white">
  //                     <div className="w-fit h-fit rounded-full bg-[#F2F2F2] p-5  shadow-[0_3px_5px_rgb(0,0,0,0.1)]">
  //                       <PersonIcon style={{color:"black",fontSize: "200px" }}/>
  //                     </div>
  //                     </div>
  //                 </div>
  //               );     
  //             };
  //       return (
  //               <div className=" relative h-full w-full flex items-center justify-center">
  //                 <video  className="w-full h-full object-cover" autoPlay ref={remotevid} id="remote" ></video>
  //               </div>
  //           );
  //       }

        

  //   const renderLocalvideeo=()=>{
  //     if(!islocalVideoEnabled){
  //       return <div className=" relative h-full w-full flex items-center justify-center border border-black/10 ">
  //                         <video  className="w-full h-full object-cover shadow-[0_3px_5px_rgb(0,0,0,0.1)]" autoPlay ref={remotevid} id="remote" ></video>
  //                         <div className="absolute w-full h-full flex items-center justify-center bg-white shadow-[0_3px_15px_rgb(0,0,0,0.8)]">
  //                           <div className="w-fit h-fit rounded-full bg-[#F2F2F2] p-5  shadow-[0_3px_5px_rgb(0,0,0,0.1)]">
  //                             <PersonIcon style={{color:"black",fontSize: "80px" }}/>
  //                           </div>
  //                           </div>
  //                       </div> 
  //     }
  //       return <div className=" relative h-full w-full flex items-center justify-center">
  //          <video  className="w-full h-full object-cover" autoPlay ref={localvid} ></video>
  //         </div>
      
  //   }