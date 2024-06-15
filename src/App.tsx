import axios from 'axios';
import LoadingSpinner from 'LoadingSpinner';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import TableContents from 'TableContents';
import { Input, Movie } from 'Types';

const MainContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-wrap: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: row;
  gap: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const InputField = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SelectField = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const yearArray: string[] = ['전체 선택'];
  for (let i = 0; i <= 130; i++) {
    yearArray.push((i + 1900).toString());
  }
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
      const params = new URLSearchParams();

      if (data.movieTitle) {
        params.append('movieTitle', data.movieTitle);
      }
      if (data.directorName) {
        params.append('directorName', data.directorName);
      }
      if (data.fromYear) {
        params.append('fromYear', data.fromYear.toString());
      }
      if (data.toYear) {
        params.append('toYear', data.toYear.toString());
      }

      setLoading(true);
      const response = await axios.get<Movie[]>(
        `/search-movies?${params.toString()}`,
      );

      setLoading(false);
      setMovies(response.data);
      reset();
    } catch (error) {
      setError('Failed to search movies');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <MainContainer>
      {loading && <LoadingSpinner />}
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Movie Title</Label>
          <InputField type="text" {...register('movieTitle')} />
        </FormGroup>
        <FormGroup>
          <Label>Director Name</Label>
          <InputField type="text" {...register('directorName')} />
        </FormGroup>
        <FormGroup>
          <Label>From Year</Label>
          <SelectField {...register('fromYear')}>
            {yearArray.map((year, idx) => (
              <option key={idx} value={year}>
                {year}
              </option>
            ))}
          </SelectField>
        </FormGroup>
        <FormGroup>
          <Label>To Year</Label>
          <SelectField {...register('toYear')}>
            {yearArray.map((year, idx) => (
              <option key={idx} value={year}>
                {year}
              </option>
            ))}
          </SelectField>
        </FormGroup>
        <Button type="submit">Search</Button>
      </FormContainer>

      <TableContents movieList={movies} />
    </MainContainer>
  );
}

export default App;
