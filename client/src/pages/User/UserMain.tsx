import React from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import WaveForm from "../../components/WaveForm";
import { useMockTracks } from "../../mockData/useMockTracks";

const UserMain = () => {
  const tracks = useMockTracks();
  return (
    <div className="w-full">
      <h3 className="py-5 text-2xl font-light">Recent</h3>
      <ul>
        {tracks.map((track, idx) => {
          return (
            <li key={idx} className="mb-9">
              <div className="flex">
                {/* Artwork Image*/}
                <div
                  style={{ backgroundImage: `url(${track.artworkUrl})` }}
                  className="w-40 h-40 mr-4 shrink-0 bg-center bg-cover"
                ></div>
                {/* content */}
                <div className="w-full">
                  <div className="py-2 flex justify-between">
                    <BsFillPlayCircleFill className="w-9 h-9 mr-2 shrink-0 text-red-400" />
                    <div className="w-full">
                      <div className="text-sm text-neutral-400">
                        {track.user.username}
                      </div>
                      <div>{track.title}</div>
                    </div>
                    <div className="shrink-0 text-neutral-300 text-sm">
                      20 days ago
                    </div>
                  </div>

                  <WaveForm sound_id={idx} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserMain;
