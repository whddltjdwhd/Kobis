import React, { useState } from 'react';
import Pagination from 'react-js-pagination';
import './Pagination.css';
import styled from 'styled-components';
import { Movie } from 'Types';

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  table {
    width: 80%;
    border-collapse: collapse;
    margin-bottom: 2rem;

    th,
    td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: #f2f2f2;
    }

    tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    tr:hover {
      background-color: #ddd;
    }
  }
`;

const StyledPagination = styled(Pagination)`
  margin-bottom: 2rem;
`;

interface TableContentsProps {
  movieList: Movie[];
}

function TableContents({ movieList }: TableContentsProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const moviesPerPage: number = 10;
  const indexOfLastMovie: number = currentPage * moviesPerPage;
  const indexOfFirstMovie: number = indexOfLastMovie - moviesPerPage;
  const currentMovies: Movie[] = movieList.slice(
    indexOfFirstMovie,
    indexOfLastMovie,
  );

  const pageChangeHandler = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <MainContainer>
      <h1>Movies</h1>
      <table>
        <colgroup>
          <col width="25%" />
          <col width="50%" />
          <col width="25%" />
        </colgroup>

        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Year</th>
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
      <StyledPagination
        activePage={currentPage}
        itemsCountPerPage={moviesPerPage}
        totalItemsCount={movieList.length}
        pageRangeDisplayed={10}
        prevPageText="<"
        nextPageText=">"
        onChange={pageChangeHandler}
      />
    </MainContainer>
  );
}

export default TableContents;
