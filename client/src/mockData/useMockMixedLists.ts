const useMockMixedLists = (): IMixedList[] => {
  const mixedListsOfNewAndHot: IMixedList = {
    id: 1,
    title: "Charts: New & hot",
    description: "Up-and-coming tracks on SoundCloud",
    createdAt: new Date(),
    updatedAt: new Date(),
    collections: [
      {
        id: 1,
        coverImg:
          "https://images.unsplash.com/photo-1570961999607-df226979f156?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YWxsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        title: "All music genres",
        tracks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        coverImg:
          "https://images.unsplash.com/photo-1653661242725-c863e8020586?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        title: "Global Beats",
        tracks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        coverImg:
          "https://images.unsplash.com/photo-1601643157091-ce5c665179ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGlwJTIwaG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        title: "Hip-hop & Rap",
        tracks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        coverImg:
          "https://images.unsplash.com/photo-1653471449332-831d5e48ff72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        title: "Pop",
        tracks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        coverImg:
          "https://images.unsplash.com/photo-1653569693215-3b1fc81d2b7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        title: "House",
        tracks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        coverImg:
          "https://images.unsplash.com/photo-1653660511035-d8525eac7ff7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5NHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        title: "R&B & Soul",
        tracks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };
  const mixedListsOfSleep: IMixedList = {
    id: 2,
    title: "Sleep",
    description: "Popular playlists from the SoundCloud community",
    createdAt: new Date(),
    updatedAt: new Date(),
    collections: [
      {
        id: 1,
        coverImg:
          "https://images.unsplash.com/photo-1532099514109-7d2d71629d82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHNsZWVwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        title: "Relax",
        tracks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        coverImg:
          "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c3VtbWVyJTIwbmlnaHR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
        title: "Summer Night",
        tracks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        coverImg:
          "https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG5pZ2h0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        title: "Sleep",
        tracks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        coverImg:
          "https://images.unsplash.com/photo-1558486012-817176f84c6d?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHN1bW1lciUyMG5pZ2h0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800",
        title: "Jazzy Night",
        tracks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        coverImg:
          "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Zmxvd2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        title: "Beauty inside",
        tracks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        coverImg:
          "https://images.unsplash.com/photo-1585920768861-e595e4bf7768?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJhaW55JTIwZGF5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        title: "Rainy Days",
        tracks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };
  return [mixedListsOfNewAndHot, mixedListsOfSleep];
};

export default useMockMixedLists;
