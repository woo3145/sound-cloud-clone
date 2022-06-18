import { BsFillPlayFill } from "react-icons/bs";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";

const MusicPlayer = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-neutral-200 h-12 border-t border-neutral-300 flex justify-center">
      <div className="flex self-stretch max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg bg-red-200 w-full">
        {/* Controller */}
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center text-2xl px-4 shrink-0">
            <BiArrowToLeft />
            <BsFillPlayFill />
            <BiArrowToRight />
          </div>
          <div className="w-full">
            <input
              type="range"
              className="w-full h-1 rounded-lg bg-gray-400 text-red-300"
            />
          </div>
        </div>
        <div className="shrink-0 w-80 bg-slate-300">
          {/* Current Track Detail */}
          <div></div>
          {/* More Menu */}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
