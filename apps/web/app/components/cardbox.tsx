export const Dialog=()=>{
    return (<>
    <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1F2224] w-[500px] h-[180px] rounded-xl border-white/20 border-[1px]">
        <div className="px-6 pt-6 flex flex-col gap-2">
        <div className="text-white/90 text-xl">Start Recording</div>
        <div className="text-white/60">The other user want's to start recording. Do you want to start your recording?</div>
        </div>
        <div className="flex gap-2 justify-end pr-12">
        <button className="text-white w-[60px] h-[35px] bg-[#24292b] px-2 border border-white/20 rounded-md ">No</button>
        <button className="text-white w-[60px] h-[35px] bg-[#24292b] px-2 border border-white/20 rounded-md ">Yes</button>
        </div>
    </div>
    </>)
}