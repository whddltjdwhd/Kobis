export interface Movie {
  id: number;
  title?: string;
  eng_title?: string;
  year?: number;
  country?: string;
  m_type?: string;
  genre?: string;
  status?: string;
  company?: string;
  name?: string;
}

export interface Input {
  movieTitle?: string;
  directorName?: string;
  fromYear?: number;
  toYear?: number;
}
