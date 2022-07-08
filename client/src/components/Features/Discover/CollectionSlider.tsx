import React, { useRef } from "react";
import { CollectionCard } from "../../Shared/Cards/CollectionCard";

const LeftButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className="btn btn-circle absolute text-center left-2 top-1/3"
      onClick={onClick}
    >
      ❮
    </div>
  );
};
const RightButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className="btn btn-circle absolute text-center right-2 top-1/3"
      onClick={onClick}
    >
      ❯
    </div>
  );
};

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
                description={"Charts: New & hot"}
              />
            </div>
          );
        })}
      </div>
      {/* Control Buttons*/}
      <>
        <LeftButton onClick={left} />
        <RightButton onClick={right} />
      </>
    </div>
  );
};

export default CollectionSlider;
