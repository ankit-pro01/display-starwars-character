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
interface Props {}

export default function CharacterDetails({}: Props): ReactElement {
  const params = useParams();
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [loading, isError, characterDetails] = useFetch(characterImageURl, params.characterId);
  const characterDetailsObj = { ...characterDetails } as IcharacterDetails;
  const [characterData, setCharacterData] = useState({} as IcharacterDetails);
  const [disabledFavouritiesButton, setDisabledFavouritiesButton] = useState(false);

  useEffect(() => {
    if (
      Object.keys(characterDetailsObj).length !== 0 &&
      characterDetailsObj.constructor === Object
    ) {
      setDetailsLoading(true);

      fetchAllData(characterDetailsObj)
        .then((res) => {
          const [homePlanet, films, starShips] = res;
          characterDetailsObj['homeworld'] = homePlanet.name;
          characterDetailsObj['films'] = films
            .reduce((acc: any, el: { [x: string]: any }) => {
              return [...acc, el['title']];
            }, [])
            .join(',');

          characterDetailsObj['starships'] = starShips
            .reduce((acc: any, el: { [x: string]: any }) => {
              return [...acc, el['name']];
            }, [])
            .join(',');
          let details = { ...characterDetailsObj };
          const { imageUrl } = appendImgUrl(details as unknown as Record<string, string>);
          details['imageUrl'] = imageUrl;
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

  const fetchAllData = async (characterDetailsObj: IcharacterDetails) => {
    const homePlanet = await fetchHomePlanet(characterDetailsObj['homeworld'] as string);
    const films = await fetchAllFilms(characterDetailsObj['films']);
    const starShips = await fetchAllStarShips(characterDetailsObj['starships']);
    return Promise.resolve([homePlanet, films, starShips]);
  };

  const fetchAllFilms = async (films: []) => {
    const filmArr = films.map((film) => {
      return fetchContent(film);
    });
    return await Promise.all([...filmArr]);
  };

  const fetchHomePlanet = async (homeworld: string) => {
    return await fetchContent(homeworld);
  };

  const fetchAllStarShips = async (starships: []) => {
    const starshipsArr = starships.map((starship) => {
      return fetchContent(starship);
    });
    return await Promise.all([...starshipsArr]);
  };

  const addToFavourities = () => {
    if (getFavouritiesCharactersName().includes(characterData.name)) {
      console.log('already in favourities list');
    } else {
      addToFavouritiesList(characterData as unknown as Record<string, string>);
      setDisabledFavouritiesButton(true);
    }
  };

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
