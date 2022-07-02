import React, { useEffect, useRef, useState } from "react";
import { CollectionCard } from "../components/Cards/CollectionCard";
import Footer from "../components/Footer";
import useMockMixedLists from "../mockData/useMockMixedLists";

const CollectionSlider = ({ collections }: { collections: ICollection[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const INTERVAL = 400;

  const left = () => {
    if (!ref.current) return;
    ref.current.scrollLeft = ref.current.scrollLeft - INTERVAL;
  };
  const right = () => {
    if (!ref.current) return;
    ref.current.scrollLeft = ref.current.scrollLeft + INTERVAL;
  };

  return (
    <div className="relative">
      <div
        className="carousel mt-4 relative cursor-pointer"
        ref={ref}
        onDrag={(e) => console.log(e)}
      >
        {/* Collection Card*/}
        {collections.map(({ coverImg, title }, idx) => {
          return (
            <div
              key={idx}
              id={`slide${idx}`}
              className="mr-4 carousel-item w-1/4"
            >
              <CollectionCard
                key={idx}
                coverImg={coverImg}
                title={title}
                mixedTitle={"Charts: New & hot"}
              />
            </div>
          );
        })}
      </div>
      {/* Control Buttons*/}
      <>
        <div
          className="btn btn-circle absolute text-center left-2 top-1/3"
          onClick={left}
        >
          ❮
        </div>
        <div
          className="btn btn-circle absolute text-center right-2 top-1/3"
          onClick={right}
        >
          ❯
        </div>
      </>
    </div>
  );
};

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
              <CollectionSlider collections={mixedListsOfNewAndHot} />
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

              <CollectionSlider collections={mixedListsOfSleep} />
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
