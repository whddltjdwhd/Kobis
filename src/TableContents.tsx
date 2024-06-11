import React, { useState } from 'react';
import Pagination from 'react-js-pagination';
import './Pagination.css';
import styled from 'styled-components';
import { Movie } from 'Types';

const MainContainer = styled.div`
  width: 100%;
  heigh: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  table {
    width: 100%;
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

const StyledPagination = styled(Pagination)``;

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
      <h1>Movies {movieList.length} 개 검색됨</h1>
      <table>
        <colgroup></colgroup>

        <thead>
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>제목(영문)</th>
            <th>제작연도</th>
            <th>제작국가</th>
            <th>유형</th>
            <th>장르</th>
            <th>제작상태</th>
            <th>감독</th>
            <th>제작사</th>
          </tr>
        </thead>

        <tbody>
          {currentMovies.map(movie => (
            <tr key={movie.movie_id}>
              <td>{movie.movie_id}</td>
              <td>{movie.title}</td>
              <td>{movie.eng_title}</td>
              <td>{movie.year}</td>
              <td>{movie.country}</td>
              <td>{movie.type}</td>
              <td>{movie.genre}</td>
              <td>{movie.status}</td>
              <td>{movie.director_name}</td>
              <td>{movie.company}</td>
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
