import React from "react";
import CollectionSlider from "./CollectionSlider";

interface Props {
  mixedLists: IMixedList[];
}

const MixedListsSection = ({ mixedLists }: Props) => {
  return (
    <ul>
      {mixedLists.map((mixedList, idx) => {
        return (
          <li className="border-b mb-8" key={idx}>
            <div>
              <h2 className="text-2xl sm:text-3xl font-light mb-0.5 sm:mb-1">
                {mixedList.title}
              </h2>
              <p className="text-sm text-neutral-400">
                {mixedList.description}
              </p>
            </div>
            <CollectionSlider collections={mixedList.collections} />
          </li>
        );
      })}
    </ul>
  );
};

export default MixedListsSection;
