import React from "react";
import { Link } from "react-router-dom";
import MusicCard from "../components/Cards/MusicCard";
import useMockMixedLists from "../mockData/useMockMixedLists";

function Discover() {
  const { mixedListsOfNewAndHot, mixedListsOfSleep } = useMockMixedLists();
  return (
    <div className="w-full flex">
      <div className="w-full sm:max-w-[600px] md:max-w-[750px] lg:max-w-[910px] pt-8 px-8 overflow-hidden">
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
      <div className="hidden p-4 sm:block w-full shrink-0  min-h-screen max-w-[330px] border-gray-100 border-l box-border">
        <div className="sticky top-16 w-full h-auto">
          {/* SideBar Footer */}
          <div className="border-t border-gray-100 pt-4 flex flex-wrap gap-0.5 text-xs text-neutral-400">
            <Link to="/" className="hover:text-neutral-500">
              Legal
            </Link>
            ∙
            <Link to="/" className="hover:text-neutral-500">
              Privacy
            </Link>
            ∙
            <Link to="/" className="hover:text-neutral-500">
              Cookie Policy
            </Link>
            ∙
            <Link to="/" className="hover:text-neutral-500">
              Consent Manager
            </Link>
            ∙
            <Link to="/" className="hover:text-neutral-500">
              Imprint
            </Link>
            ∙
            <Link to="/" className="hover:text-neutral-500">
              Creator Resources
            </Link>
            ∙
            <Link to="/" className="hover:text-neutral-500">
              Blog
            </Link>
            ∙
            <Link to="/" className="hover:text-neutral-500">
              Charts
            </Link>
            ∙
            <div className="pt-2 cursor-pointer group">
              <span className="text-blue-600 mr-1 group-hover:text-neutral-700">
                Language:
              </span>
              <span className="text-neutral-700">English (US)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discover;
