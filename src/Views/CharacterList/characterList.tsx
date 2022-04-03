import React, { ReactElement, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../../Utils/useFetch';

import Character from '../../components/Character/Character';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';
import SearchComponent from '../../components/SearchComponent/SearchComponent';
import { characterUrl } from '../../ApplicationConstants';

export default function CharacterList(): ReactElement {
  const [page, handlePage] = useState(0);
  const [peopleUrl, setPeopleUrl] = useState(characterUrl);
  const [loading, isError, characterList] = useFetch(peopleUrl);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!!characterList) {
      const list = [...(characterList as [])];
      setResults(list.slice(page * 10, (page + 1) * 10));
    }
    window?.scrollTo(0, 0);
  }, [page, characterList]);

  if (loading) return <Loader />;
  if (isError)
    return (
      <div className="alert alert-warning" role="alert">
        Some thing went wrong. please try agiain letter!
      </div>
    );

  const handleClick = (e: React.KeyboardEvent) => {
    const id = (e.target as HTMLInputElement).id;
    if (id) navigate(`${location.pathname}/${id}`);
  };

  const filterCharacterList = (inputValue: string) => {
    const result = [...(characterList as [Record<string, string>])].filter((character) => {
      return (character.name as string).toLowerCase().includes(inputValue.toLowerCase());
    });

    const list = result.slice(0, 10);
    setResults(list as []);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-4 col-lg-4 my-4">
          <SearchComponent filterCharacterList={filterCharacterList} />
        </div>
      </div>
      <div className="row" onClick={(e) => handleClick(e as unknown as React.KeyboardEvent)}>
        {results.map((character: Record<string, string>) => {
          return <Character key={character.url} character={character} />;
        })}
      </div>
      <div className="row">
        {!!results.length && (
          <Pagination
            page={page}
            handlePage={handlePage}
            hasNextPage={(characterList as []).length > page * 10}
          />
        )}
      </div>
    </div>
  );
}
