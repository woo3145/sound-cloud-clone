interface ITrack extends ICommonEntity {
  title: string;
  description?: string;
  duration: number;
  isPublic: boolean;
  genre?: string;

  audioUrl: string;
  artworkUrl?: string;

  user: IUser;
}
