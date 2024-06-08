import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import Pagination from 'react-js-pagination';
import './Pagination.css';
import { styled } from 'styled-components';

interface Movie {
  id: number;
  title: string;
  engTitle?: string;
  year: number;
  country: string;
  mType: string;
  genre: string;
  status?: string;
  director: string;
  company?: string;
  enterDate?: Date;
}

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
  const [currentPage, setCurrentPage] = useState<number>(1);

  const moviesPerPage: number = 10;
  const indexOfLastMovie: number = currentPage * moviesPerPage;
  const indexOfFirstMovie: number = indexOfLastMovie - moviesPerPage;
  const currentMovies: Movie[] = movies.slice(
    indexOfFirstMovie,
    indexOfLastMovie,
  );

  const pageChangeHandler = (page: number) => {
    setCurrentPage(page);
  };

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
      <h1>Movies</h1>
      <table>
        <colgroup>
          <col width={'25%'} />
          <col width={'50%'} />
          <col width={'25%'} />
        </colgroup>

        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>year</th>
          </tr>
        </thead>

        <tbody>
          {currentMovies.map(movie => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.title}</td>
              <td>{movie.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={moviesPerPage}
        totalItemsCount={movies.length}
        pageRangeDisplayed={10}
        prevPageText={'<'}
        nextPageText={'>'}
        onChange={pageChangeHandler}
      />
    </MainContainer>
  );
}

export default App;
