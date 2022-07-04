import React, { useEffect, useRef, useState } from "react";
import { CollectionCard } from "../components/Shared/Cards/CollectionCard";
import MixedListsSection from "../components/Features/Discover/MixedListsSection";
import Footer from "../components/Layouts/Common/Footer";
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
  const mixedLists = useMockMixedLists();

  return (
    <div className="flex relative">
      <div className="w-full px-4 py-4 lg:px-8 lg:py-8 box-border">
        <h1 className="mb-5 text-3xl sm:text-4xl font-normal border-b leading-normal sm:leading-relaxed">
          Discover Tracks and Playlists
        </h1>
        <MixedListsSection mixedLists={mixedLists} />
      </div>
      <div className="hidden md:block p-4 max-h-screen w-[500px] border-l box-border">
        <div className="sticky top-16 h-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Discover;
