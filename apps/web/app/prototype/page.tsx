import { RoomNameDialog } from "../dashboard/components/RoomNameDialog"
import QuickinfoBoxs from "../dashboard/components/QuickActionBox/quickinfobox"
import { UploadingIndicator } from "../components/uploadingIndicator"
import JoinBox from "../dashboard/components/QuickActionBox/JoinRoom"
import { RoomCard } from "../dashboard/components/RecBox/Roomcard"
import RecordingsBox from "../dashboard/components/RecBox/recordingsBox"
import { JoinRoomDialog } from "../dashboard/components/joinroombox"

export type RoomsWRecordings = {
    name: string,
    date: string,
    roomId: string
}

export default function Dashboard() {
    return (
        <div className="relative min-h-screen bg-[#F5F5F5] w-full flex flex-col items-center px-4 sm:px-6 md:px-10 lg:px-12 py-6 sm:py-8 lg:py-10 overflow-x-hidden">
            <UploadingIndicator />
            <div className="relative w-full max-w-6xl flex flex-col gap-6">
                <div className="absolute -left-25 -top-2 size-11 sm:size-12 overflow-hidden flex items-center justify-center rounded-2xl bg-white shadow-sm shrink-0">
                    <img
                        src="/logoimg.jpg"
                        alt="Podster Logo"
                        className="size-[64px] object-cover object-center"
                    />
                </div>
                {/* Header with Logo and Title */}
                <div className="flex items-center gap-4 w-full ml-4">
                    <h1 className="text-black text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
                </div>

                {/* Main Content Grid */}
                <main className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full items-start justify-center">
                    {/* Left Column: Actions & Quick Info */}
                    <div aria-label="Quick Actions & Statistics" className="flex-1 flex flex-col gap-4 sm:gap-6 w-full min-w-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
                            <div className="hidden sm:block">
                                <RoomNameDialog />
                            </div>
                            <JoinRoomDialog />
                        </div>
                        <QuickinfoBoxs />
                    </div>

                    {/* Right Column: Downloads / Recordings */}
                    <div className="w-full lg:w-[380px] xl:w-[420px] flex flex-col bg-[#E2E2E2] rounded-3xl p-4 sm:p-5 gap-3 max-h-[560px] min-h-[460px] shrink-0">
                        <div className="px-2 font-semibold text-black/80 text-left w-full text-base sm:text-lg flex items-center justify-between">
                            <span>Downloads</span>
                            <span className="text-xs font-medium text-black/50 bg-black/5 px-2 py-0.5 rounded-full">5 items</span>
                        </div>
                        <div className="flex flex-col gap-3 pr-0.5 w-full flex-1 h-[100px]">
                            <RecordingsBox />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}