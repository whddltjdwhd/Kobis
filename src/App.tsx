import axios from 'axios';
import LoadingSpinner from 'LoadingSpinner';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import TableContents from 'TableContents';
import { Input, Movie } from 'Types';

const MainContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm();

  const getMovies = async () => {
    try {
      const response = await axios.get<Movie[]>('/movies');
      setMovies(response.data);
    } catch (error) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const onSubmit = async (data: Input) => {
    try {
      console.log(data);
      const params = new URLSearchParams();

      if (data.movieTitle) {
        params.append('movieTitle', data.movieTitle);
      }
      if (data.directorName) {
        params.append('directorName', data.directorName);
      }
      if (data.fromDate) {
        params.append('fromDate', data.fromDate.toString());
      }
      if (data.toDate) {
        params.append('toDate', data.toDate.toString());
      }

      const response = await axios.get<Movie[]>(
        `/search-movies?${params.toString()}`,
      );
      // console.log(response.data);
      setMovies(response.data);
      reset();
    } catch (error) {
      setError('Failed to search movies');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <MainContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Movie Title</label>
          <input type="text" {...register('movieTitle')} />
        </div>
        <div>
          <label>Director Name</label>
          <input type="text" {...register('directorName')} />
        </div>
        <div>
          <label>fromDate</label>
          <input type="date" {...register('fromDate')} />
        </div>
        <div>
          <label>toDate</label>
          <input type="date" {...register('toDate')} />
        </div>
        <button type="submit">검색</button>
      </form>

      <TableContents movieList={movies} />
    </MainContainer>
  );
}

export default App;
