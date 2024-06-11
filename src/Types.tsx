export interface Movie {
  movie_id: number;
  title: string;
  engTitle?: string;
  year?: number;
  country?: string;
  mType?: string;
  genre?: string;
  status?: string;
  director: string;
  company?: string;
  enterDate?: Date;
}

export interface Input {
  movieTitle?: string;
  directorName?: string;
  fromDate?: number;
  toDate?: number;
}
