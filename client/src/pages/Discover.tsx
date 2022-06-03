import React from "react";
import MusicCard from "../components/Cards/MusicCard";
import Footer from "../components/Footer";
import useMockMixedLists from "../mockData/useMockMixedLists";

function Discover() {
  const { mixedListsOfNewAndHot, mixedListsOfSleep } = useMockMixedLists();
  return (
    <div className="w-full flex">
      <div className="w-full sm:max-w-[570px] md:max-w-[720px] lg:max-w-[880px] pt-8 px-8 overflow-hidden">
        <div className="min-h-screen w-full">
          {/* Header */}
          <div>
            <h1 className="mb-5 text-3xl sm:text-4xl font-normal border-b leading-normal sm:leading-relaxed">
              Discover Tracks and Playlists
            </h1>
          </div>
          {/* Contents */}
          <ul>
            <li className="border-b mb-8">
              {/* Mixed title */}
              <div className="">
                <h2 className="text-2xl sm:text-3xl font-light mb-0.5 sm:mb-1">
                  Charts: New & hot
                </h2>
                <p className="text-sm text-neutral-400">
                  Up-and-coming tracks on SoundCloud
                </p>
              </div>

              {/* Mixed lists */}
              <div className="overflow-x-scroll">
                <div className="mt-4">
                  <div className="flex">
                    {/* Music Card*/}
                    {mixedListsOfNewAndHot.map(({ coverImg, title }) => {
                      return (
                        <MusicCard
                          key={title}
                          coverImg={coverImg}
                          title={title}
                          mixedTitle={"Charts: New & hot"}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </li>
            <li className="border-b mb-8">
              {/* Mixed title */}
              <div className="">
                <h2 className="text-2xl sm:text-3xl font-light mb-0.5 sm:mb-1">
                  Sleep
                </h2>
                <p className="text-sm text-neutral-400">
                  Popular playlists from the SoundCloud community
                </p>
              </div>

              {/* Mixed lists */}
              <div className="overflow-x-scroll">
                <div className="mt-4">
                  <div className="flex">
                    {/* Music Card*/}
                    {mixedListsOfSleep.map(({ coverImg, title }) => {
                      return (
                        <MusicCard
                          key={title}
                          coverImg={coverImg}
                          title={title}
                          mixedTitle={"Charts: New & hot"}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="hidden p-8 sm:block w-full shrink-0  min-h-screen max-w-[360px] border-gray-100 border-l box-border">
        <div className="sticky top-16 w-full h-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Discover;
