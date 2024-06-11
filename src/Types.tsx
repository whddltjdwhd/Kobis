export interface Movie {
  movie_id: number;
  title?: string;
  eng_title?: string;
  year?: number;
  country?: string;
  type?: string;
  genre?: string;
  status?: string;
  company?: string;
  director_name?: string;
}

export interface Input {
  movieTitle?: string;
  directorName?: string;
  fromYear?: number;
  toYear?: number;
}
