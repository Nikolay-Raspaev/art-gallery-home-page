export interface IAxiosPainting {
  authorId: number;
  created: string;
  id: number;
  imgUrl: string;
  locationId: number;
  name: string;
}

export interface IAuthor {
  id: number;
  name: string;
}

export interface ILocation {
  id: number;
  location: string;
}
