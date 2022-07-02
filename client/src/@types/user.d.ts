interface IUser extends ICommonEntity {
  username: string;
  avatarUrl: string;
}

interface IMe extends IUser {
  tracks: ITrack[];
  email: string;
}
