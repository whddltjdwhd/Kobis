import axios from 'axios';
import LoadingSpinner from 'LoadingSpinner';
import MovieForm from 'MovieForm';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import TableContents from 'TableContents';
import { Movie } from 'Types';

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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <MainContainer>
      <MovieForm />
      <TableContents movieList={movies} />
    </MainContainer>
  );
}

export default App;
