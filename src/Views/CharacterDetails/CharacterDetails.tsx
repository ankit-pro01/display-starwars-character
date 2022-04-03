import React, { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useFetch from '../../Utils/useFetch';
import fetchContent, {
  addToFavouritiesList,
  appendImgUrl,
  getFavouritiesCharactersName
} from '../../Utils/util';
import Loader from '../../components/Loader/Loader';

import { ADD_TO_FAVOURITIES, characterImageURl } from '../../ApplicationConstants';

interface IcharacterDetails {
  name: string;
  eye_color: string;
  films: [];
  gender: string;
  hair_color: string;
  starships: [];
  homeworld: string;
  imageUrl?: string;
  url?: string;
}

export default function CharacterDetails(): ReactElement {
  const params = useParams();
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [loading, isError, characterDetails] = useFetch(characterImageURl, params.characterId);
  const [characterData, setCharacterData] = useState({} as IcharacterDetails);
  const [disabledFavouritiesButton, setDisabledFavouritiesButton] = useState(false);

  const characterDetailsObj = Object.assign(characterDetails as unknown as IcharacterDetails);

  const fetchAllFilms = async (films: []) => {
    const filmArr = films.map((film) => {
      return fetchContent(film);
    });
    const promise = await Promise.all([...filmArr]);
    return promise;
  };

  const fetchHomePlanet = async (homeworld: string) => {
    const promise = await fetchContent(homeworld);
    return promise;
  };

  const fetchAllStarShips = async (starships: []) => {
    const starshipsArr = starships.map((starship) => {
      return fetchContent(starship);
    });
    const results = await Promise.all([...starshipsArr]);
    return results;
  };

  const fetchAllData = async (characterDetail: IcharacterDetails) => {
    const homePlanet = await fetchHomePlanet(characterDetail.homeworld as string);
    const films = await fetchAllFilms(characterDetail.films);
    const starShips = await fetchAllStarShips(characterDetail.starships);
    return Promise.resolve([homePlanet, films, starShips]);
  };

  const addToFavourities = () => {
    if (getFavouritiesCharactersName().includes(characterData.name)) {
      console.log('already in favourities list');
    } else {
      addToFavouritiesList(characterData as unknown as Record<string, string>);
      setDisabledFavouritiesButton(true);
    }
  };

  useEffect(() => {
    if (
      Object.keys(characterDetailsObj).length !== 0 &&
      characterDetailsObj.constructor === Object
    ) {
      setDetailsLoading(true);

      fetchAllData(characterDetailsObj)
        .then((res) => {
          const [homePlanet, films, starShips] = res;
          characterDetailsObj.homeworld = homePlanet.name;
          characterDetailsObj.films = films
            .reduce((acc: Array<unknown>, el: { [x: string]: unknown }) => {
              return [...acc, el.title];
            }, [])
            .join(',');

          characterDetailsObj.starships = starShips
            .reduce((acc: Array<unknown>, el: { [x: string]: unknown }) => {
              return [...acc, el.name];
            }, [])
            .join(',');
          const details = { ...characterDetailsObj };
          const { imageUrl } = appendImgUrl(details as unknown as Record<string, string>);
          details.imageUrl = imageUrl;
          setDetailsLoading(false);
          if (getFavouritiesCharactersName().includes(details.name)) {
            setDisabledFavouritiesButton(true);
          }
          setCharacterData(details);
        })
        .catch((err) => {
          setDetailsLoading(false);
          console.log(err);
        });
    }
  }, [characterDetails]);

  const message = (
    <div className="alert alert-success" role="alert">
      This character is in your favourities list
    </div>
  );

  if (loading || detailsLoading) return <Loader />;
  if (isError)
    return (
      <div className="alert alert-warning" role="alert">
        Some thing went wrong. please try agiain letter!
      </div>
    );

  return (
    <div className="card mx-auto my-lg-5 border border-warning" style={{ maxWidth: '50rem' }}>
      <div className="row">
        <div className="col-sm-5">
          <img className="d-block w-100" src={characterData.imageUrl} alt="Card image cap" />
        </div>
        <div className="col-sm-7">
          <div className="card-body">
            <h4 className="card-title">{characterData.name}</h4>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="badge badge-secondary text-secondary">EYE COLOR :</span>{' '}
              <span className="badge badge-secondary text-primary">{characterData.eye_color}</span>
            </li>
            <li className="list-group-item">
              <span className="badge badge-secondary text-secondary">hair color : </span>
              <span className="badge badge-secondary text-primary">{characterData.hair_color}</span>
            </li>
            <li className="list-group-item">
              <span className="badge badge-secondary text-secondary">GENDER : </span>
              <span className="badge badge-secondary text-primary">{characterData.gender}</span>
            </li>
            <li className="list-group-item">
              <span className="badge badge-secondary text-secondary">HOME PLANET : </span>
              <span className="badge badge-secondary text-primary">{characterData.homeworld}</span>
            </li>
            <li className="list-group-item">
              <span className="badge badge-secondary text-secondary">FILMS : </span>
              <span className="text-info"> {characterData.films}</span>
            </li>
            <li className="list-group-item">
              <span className="badge badge-secondary text-secondary">STAR SHIPS :</span>
              <span className="text-info"> {characterData.starships}</span>
            </li>
            <li className="list-group-item">
              {disabledFavouritiesButton ? (
                message
              ) : (
                <button
                  type="button"
                  className="btn btn-warning"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Add to Favourities"
                  onClick={addToFavourities}
                >
                  {ADD_TO_FAVOURITIES}
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
