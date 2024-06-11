export interface Movie {
  id: number;
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
