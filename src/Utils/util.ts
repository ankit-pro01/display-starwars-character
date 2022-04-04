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

export function getFavouritiesList() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVOURITIES_LIST) || '[]');
}

export function getFavouritiesCharactersName() {
  const favouritiesList = getFavouritiesList();
  return favouritiesList.map((obj: { _id: string }) => {
    return obj._id.split('star-wars-id-')[1];
  });
}

export function addToFavouritiesList(newCharacter: Record<string, string>) {
  (function () {
    const favouritiesList = getFavouritiesList();
    //check if character already exists..
    const isCharacterExists = favouritiesList.filter((obj: { _id: string }) => {
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
  const newList = list.filter((obj: { _id: string }) => obj._id !== id);
  localStorage.setItem(LOCAL_STORAGE_FAVOURITIES_LIST, JSON.stringify(newList));
  return newList;
}

export function upDateFavouritiesObject(id: string, newCharacterObj: Record<string, string>) {
  const list = getFavouritiesList();
  const upDatedObj = list.filter((obj: { _id: string }) => obj._id === id);
  let newupdateObj = upDatedObj[0][id];
  newupdateObj = { ...newCharacterObj };
  const updatedlist = list.map((obj: { _id: string }) => {
    if (obj._id === id) {
      const newObj = {} as Record<string, string>;
      newObj[id] = newupdateObj;
      newObj._id = id;
      return newObj;
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
  let { next } = firstData;
  const { results } = firstData;
  people = results;

  while (!!next) {
    const res = await fetch(next as string);
    const data = await res.json();
    const { results: newResults, next: newNext } = data;
    people.push(...newResults);
    next = newNext;
  }
  return people;
}
