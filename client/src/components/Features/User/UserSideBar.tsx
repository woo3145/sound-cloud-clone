import React from "react";
import Footer from "../../Layouts/Common/Footer";

const InfoStatusItem = ({ text, value }: { text: string; value: number }) => {
  return (
    <div className="btn btn-ghost opacity-50 hover:bg-base-100 hover:opacity-100 flex-col">
      <p className="text-xs normal-case">{text}</p>
      <p className="text-xl">{value}</p>
    </div>
  );
};

const InfoStatus = () => {
  return (
    <ul className="flex w-full items-center justify-between bg-base-100 pb-4">
      <InfoStatusItem text={"Followers"} value={0} />
      <InfoStatusItem text={"Following"} value={0} />
      <InfoStatusItem text={"Tracks"} value={0} />
    </ul>
  );
};

const UserSideBar = () => {
  return (
    <div className="w-full">
      <InfoStatus />
      <Footer />
    </div>
  );
};

export default UserSideBar;
