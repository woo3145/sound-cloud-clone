import React from "react";
import CollectionSlider from "./CollectionSlider";

interface Props {
  mixedLists: IMixedList[];
}

const Title = () => {
  return (
    <h1 className="mb-5 text-3xl sm:text-4xl font-normal border-b leading-normal sm:leading-relaxed">
      Discover Tracks and Playlists
    </h1>
  );
};
const MixedDescription = ({ text }: { text: string }) => {
  return <p className="text-sm text-neutral-400">{text}</p>;
};

const MixedTitle = ({ text }: { text: string }) => {
  return (
    <h2 className="text-2xl sm:text-3xl font-light mb-0.5 sm:mb-1">{text}</h2>
  );
};
const DiscoverMainSectionItem = ({ mixedList }: { mixedList: IMixedList }) => {
  return (
    <li className="border-b mb-8">
      <MixedTitle text={mixedList.title} />
      <MixedDescription text={mixedList.description} />
      <CollectionSlider collections={mixedList.collections} />
    </li>
  );
};

const DiscoverMainSection = ({ mixedLists }: Props) => {
  return (
    <div>
      <Title />
      <ul>
        {mixedLists.map((mixedList, idx) => {
          return <DiscoverMainSectionItem key={idx} mixedList={mixedList} />;
        })}
      </ul>
    </div>
  );
};

export default DiscoverMainSection;
