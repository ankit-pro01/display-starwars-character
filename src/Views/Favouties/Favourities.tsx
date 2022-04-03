import React, { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FAVOURITIES_LIST_LABEL } from '../../ApplicationConstants';
import { getFavouritiesList, removeFromFavourities } from '../../Utils/util';
import FavouritiesList from '../../components/FavouritiesList/FavouritiesList';

export default function Favourities(): ReactElement {
  const [favouritiesList, setFavouritiesList] = useState([]);

  useEffect(() => {
    setFavouritiesList(getFavouritiesList());
  }, []);

  const handleRemoveCharacter = (id: string) => {
    const newList = removeFromFavourities(id);
    setFavouritiesList(newList);
  };

  const message = (
    <div className="alert alert-secondary" role="alert">
      Hi there! Your FavouritiesList is empty.
      <Link className="nav-link fw-bolder text-primary border border-bottom" to="/characters">
        {' '}
        Click here to add characters
      </Link>
    </div>
  );

  return (
    <div
      className="mx-auto mt-4 px-4 overflow-auto"
      style={{ maxWidth: '60rem', maxHeight: 'calc( 100vh- 10%)' }}
    >
      <ul className="list-group ">
        <li className="list-group-item active sticky-top bg-secondary" style={{ zIndex: '12' }}>
          <h6 className="font-weight-bold">{FAVOURITIES_LIST_LABEL}</h6>
        </li>
        {favouritiesList.length > 0 &&
          favouritiesList.map((item) => (
            <li key={item} className="list-group-item">
              <FavouritiesList listItem={item} handleRemoveCharacter={handleRemoveCharacter} />
            </li>
          ))}
        {favouritiesList.length < 1 && message}
      </ul>
    </div>
  );
}
