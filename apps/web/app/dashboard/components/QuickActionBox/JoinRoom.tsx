export default function JoinBox() {
  return (
    <div className=" md:flex bg-[#3A3A3A] rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 md:p-7 hidden flex-col justify-between items-start w-full h-[250px] sm:h-[280px] md:h-[300px] text-white cursor-pointer select-none transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.99]">
      <div className="w-full flex flex-col items-start gap-1">
        <div className="text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-tight">JOIN</div>
        <div className="text-white/95 flex flex-col text-xs sm:text-sm font-semibold leading-snug">
          <span>Join the room using</span>
          <span>link</span>
        </div>
      </div>
      <div className="flex w-full items-center justify-center my-auto pt-2">
        <div className="size-[84px] sm:size-[96px] md:size-[110px] bg-white rounded-full flex items-center justify-center shadow-md">
          <svg className="w-[60%] h-[60%]" viewBox="0 0 124 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M92.7389 51.4257C87.2116 34.4142 68.8308 25.0931 51.6491 30.6758C34.4673 36.2585 25.0759 54.6033 30.6033 71.6149C32.1047 76.2358 33.6405 79.0256 35.0534 80.9713C35.9941 82.2663 36.6637 80.473 37.0511 79.7692C39.7021 74.9518 45.6924 73.0995 50.5999 75.5803C57.8987 79.2694 65.4584 85.2198 60.6985 94.4946C58.1433 99.474 52.9657 102.882 47.3265 100.246C40.0466 96.8418 33.2212 92.3462 28.4454 85.77C26.4471 83.0184 24.5554 79.4293 22.8363 74.1385C15.8999 52.7906 27.7011 29.87 49.1255 22.9088C70.5498 15.9476 93.5695 27.5542 100.506 48.9021C102.225 54.193 102.804 58.2085 102.805 61.6092C102.806 69.7366 99.9269 77.3855 96.0384 84.4181C93.0255 89.8657 86.8337 90.152 81.8396 87.6254C72.5373 82.9197 75.1555 73.6624 78.892 66.3877C81.4042 61.496 87.3392 59.4736 92.3154 61.8127C93.7201 62.473 94.6387 63.5017 94.6383 61.611C94.6376 59.2064 94.2404 56.0467 92.7389 51.4257Z" fill="#3A3A3A" />
          </svg>
        </div>
      </div>
    </div>
  );
}
