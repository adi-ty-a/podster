    export class mediaManager{
        public mediaPromise:Promise<MediaStream>|undefined;
        public localstream:MediaStream|undefined;
        constructor(public onIsLocalVideoEnabled:(state:boolean)=>void,public onIsRemoteVideoEnabled:(state:boolean)=>void){}

        getmedia=async()=>{      
        if (this.localstream) return this.localstream;
        if(this.mediaPromise) return this.mediaPromise;
            this.mediaPromise =  navigator.mediaDevices.getUserMedia({  video:true,audio: true});
            this.localstream =  await this.mediaPromise;
            return this.localstream;
        }

        togglevideo = () => {
            let state:boolean|undefined;
            if(this.localstream){
                this.localstream?.getVideoTracks().forEach((e)=>{
                    e.enabled = !e.enabled
                    this.onIsLocalVideoEnabled?.(e.enabled);
                    state = e.enabled;
                })
            }
            return state;
            
        };

        toggleaduio = () => {
            if(this.localstream){
                this.localstream?.getAudioTracks().forEach((e:any)=>{
                    e.enabled = e.enabled
                })
            }
        };

        stop() {
        this.localstream?.getTracks().forEach(track => track.stop());
        this.localstream = undefined;
        }

        }
