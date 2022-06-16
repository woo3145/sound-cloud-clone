interface User {
  username: string;
  email: string;
  avatarUrl?: string;
}

interface Track {
  title: string;
  description?: string;
  artworkUrl?: string;
  isPublic: boolean;
  genre?: string;
  audioUrl: string;
  user: User;
}

export const useMockTracks = () => {
  const user: User = {
    username: "cw",
    email: "cw@gmail.com",
    avatarUrl:
      "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c3VtbWVyJTIwbmlnaHR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  };
  const tracks: Track[] = [
    {
      title: "test",
      description: "description",
      isPublic: true,
      artworkUrl:
        "https://images.unsplash.com/photo-1532099514109-7d2d71629d82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHNsZWVwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      genre: "pop",
      audioUrl: "",
      user: user,
    },
    {
      title: "test",
      description: "description",
      isPublic: true,
      artworkUrl:
        "https://images.unsplash.com/photo-1532099514109-7d2d71629d82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHNsZWVwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      genre: "pop",
      audioUrl: "",
      user: user,
    },
    {
      title: "test",
      description: "description",
      isPublic: true,
      artworkUrl:
        "https://images.unsplash.com/photo-1532099514109-7d2d71629d82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHNsZWVwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      genre: "pop",
      audioUrl: "",
      user: user,
    },
  ];

  return tracks;
};
