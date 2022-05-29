import React from "react";
import Footer from "../components/Footer";

function SignIn() {
  return (
    <div className="w-full flex items-center flex-col px-8">
      <div className="max-w-md w-full py-8">
        <div className="pt-5 pb-10">
          <h2 className="text-2xl text-center font-light leading-8">
            Join SoundCloud(clone) to save your favorite tracks, playlists and
            albums
          </h2>
        </div>
        <div className="w-full h-auto border p-8">Login Component</div>
      </div>
      <Footer />
    </div>
  );
}

export default SignIn;
