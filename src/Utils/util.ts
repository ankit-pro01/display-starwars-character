import { characterImageURl, LOCAL_STORAGE_FAVOURITIES_LIST } from '../ApplicationConstants';

export default function fetchContent(url: RequestInfo) {
  return fetch(url)
    .then((res) => res.json())
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function generateRanDomID(name = 'xxxxx') {
  return `star-wars-id-${name}star-wars-id-${Math.floor(Math.random() * 100)}-id-${Date.now()}`;
}

export function getFavouritiesCharactersName() {
  let favouritiesList = getFavouritiesList();
  return favouritiesList.map((obj: { _id: string }) => {
    return obj._id.split('star-wars-id-')[1];
  });
}

export function getFavouritiesList() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVOURITIES_LIST) || '[]');
}

export function addToFavouritiesList(newCharacter: Record<string, string>) {
  (function () {
    let favouritiesList = getFavouritiesList();
    //check if character already exists..
    let isCharacterExists = favouritiesList.filter((obj: { _id: string }) => {
      return obj._id.split('star-wars-id-')[1] === newCharacter.name;
    });

    if (isCharacterExists.length < 1) {
      const uniqueId = generateRanDomID(newCharacter.name);
      favouritiesList.push({ _id: uniqueId, [uniqueId]: { ...newCharacter } });
      localStorage.setItem(LOCAL_STORAGE_FAVOURITIES_LIST, JSON.stringify(favouritiesList));
    }
  })();
}

export function removeFromFavourities(id: string) {
  const list = getFavouritiesList();
  let newList = list.filter((obj: { _id: string }) => obj._id !== id);
  localStorage.setItem(LOCAL_STORAGE_FAVOURITIES_LIST, JSON.stringify(newList));
  return newList;
}

export function upDateFavouritiesObject(id: string, newObj: {}) {
  const list = getFavouritiesList();
  let upDatedObj = list.filter((obj: { _id: string }) => obj._id === id);
  let newupdateObj = upDatedObj[0][id];
  newupdateObj = { ...newObj };
  let updatedlist = list.map((obj: { _id: string }) => {
    if (obj._id === id) {
      let obj = {} as Record<string, string>;
      obj[id] = newupdateObj;
      obj['_id'] = id;
      return obj;
    } else {
      return obj;
    }
  });

  localStorage.setItem(LOCAL_STORAGE_FAVOURITIES_LIST, JSON.stringify(updatedlist));
  console.log('success');
}

export const appendImgUrl = (obj: Record<string, string>) => {
  const characterId = obj.url.split('/')[obj.url.split('/').length - 2];
  return {
    ...obj,
    imageUrl: `${characterImageURl}/${characterId}.jpg`
  };
};

export async function getAllStarwarsPeople() {
  let people: Array<Record<string, string>> = [];
  const firstRespose = await fetch('https://swapi.dev/api/people/');
  const firstData = await firstRespose.json();
  let { results, next } = firstData;
  people = results;

  while (!!next) {
    let res = await fetch(next as string);
    let data = await res.json();
    let { results, next: newNext } = data;
    people.push(...results);
    next = newNext;
  }
  return people;
}

export async function getSearchedQueryCharacters() {}
