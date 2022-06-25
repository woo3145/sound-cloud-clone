export interface User {
  id: number;
  username: string;
  email?: string;
  avatarUrl?: string;
}

export interface Track {
  title: string;
  description?: string;
  artworkUrl?: string;
  isPublic: boolean;
  genre?: string;
  audioUrl: string;
  user: User;
}

export const useMockTracks = () => {
  const trackUrl = "audio/cw-blues.mp3";
  const trackUrl2 = "audio/ncs-music-1.mp3";
  const trackUrl3 = "audio/ncs-music-2.mp3";

  const user: User = {
    id: 3,
    username: "woo3145",
    email: "lcwoo3145@gmail.com",
    avatarUrl:
      "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c3VtbWVyJTIwbmlnaHR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  };
  const tracks: Track[] = [
    {
      title: "woo3145 - slow blues",
      description:
        "Youtube - The Ringers - 2/6/14 - Jimmy Herring, Wayne Krantz, Michael Landau - BB Kings NYC (4:00 ~ 5:50) 카피",
      isPublic: true,
      artworkUrl:
        "https://images.unsplash.com/photo-1626211786632-cae0956cd772?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJsdWVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      genre: "Blues",
      audioUrl: trackUrl,
      user: user,
    },
    {
      title: "Tobu & Itro - Sunburst [NCS Release]",
      description: "description",
      isPublic: true,
      artworkUrl:
        "https://images.unsplash.com/photo-1532099514109-7d2d71629d82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHNsZWVwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      genre: "E.M.D",
      audioUrl: trackUrl2,
      user: user,
    },
    {
      title: "Janji - Heroes Tonight (feat. Johnning) [NCS Release]",
      description: "description",
      isPublic: true,
      artworkUrl:
        "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3BhY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      genre: "E.M.D",
      audioUrl: trackUrl3,
      user: user,
    },
  ];

  return tracks;
};
