import React from "react";
import DiscoverMainSection from "../components/Features/Discover/DiscoverMainSection";
import useMockMixedLists from "../mockData/useMockMixedLists";
import DiscoverSideRightSection from "../components/Features/Discover/DiscoverSideRightSection";

function Discover() {
  const mixedLists = useMockMixedLists();

  return (
    <div className="flex relative">
      <div className="w-full px-4 py-4 lg:px-8 lg:py-8 box-border">
        <DiscoverMainSection mixedLists={mixedLists} />
      </div>
      <div className="hidden md:block p-4 max-h-screen w-[500px] border-l box-border">
        <DiscoverSideRightSection />
      </div>
    </div>
  );
}

export default Discover;
