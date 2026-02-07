import { Nav_box } from "../components/nav_box"
import { Header } from "../components/Header"
import { Quickactions } from "./components/QuickActionBox/Quickactions"
import { RoomNameDialog } from "./components/RoomNameDialog"
import { UploadingIndicator } from "../components/uploadingIndicator"
import ToggleNavBox from "./components/navbox"
import RecordingsBox from "./components/RecBox/recordingsBox"
import QuickinfoBoxs from "./components/QuickActionBox/quickinfobox"

export type RoomsWRecordings = {
    name:string,
    date:string,
    roomId:string
}

export default function Dashboard(){

return <>
        <div className="relative flex">
            <UploadingIndicator/>
            <div className="border-r border-gray-300/50 h-screen min-w-[250px] max-w-[420px]">
                <div className=" relative  border-b py-6 flex items-center gap-2 justify-start pl-6">
                    <div className="relative flex">
                        <div className="size-[50px] overflow-hidden flex items-center justify-center rounded-2xl">
                            <img
                            src="/logoimg.jpg"
                            alt="Logo"
                            className="size-[80px]  object-cover object-center"
                            />
                        </div>
                            <div className=" absolute left-10 size-[15px] rounded-full bg-black animate-pulse"></div>
                        </div>
                        <div className="text-2xl font-bold  ">Podster</div>
                </div>
                    <ToggleNavBox/>
                <div className="h-px mt-12 mx-6 bg-[#E5E7EB]"></div>
                <Nav_box tittle="help"/>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <Header tittle="Dashboard" size="sm"/>
                <div className="font-semibold text-lg ml-10 mt-6">Quick Actions</div>
                <div className="flex w-[80%] pr-12 gap-12">
                    <RoomNameDialog/>
                    <Quickactions variant="join" />
                </div>
                <QuickinfoBoxs/>
            <div className="font-semibold text-lg ml-10 my-10">Recordings</div>
                <RecordingsBox/>
            </div>
        </div>
    </>
}