import React, { ReactElement, useEffect, useState } from 'react';
import { upDateFavouritiesObject } from '../../Utils/util';
import Loader from '../Loader/Loader';

interface Props {
  listItem: Record<string, string>;
  handleRemoveCharacter: (a: string) => void;
}

interface Idata {
  name: string;
  height: string;
  gender: string;
  homeworld: string;
  imageUrl: string;
}

interface InputProps {
  id: string;
  item: Idata;
  name: string;
  value: string;
}

const InputElement = ({ id, item, name, value }: InputProps): ReactElement => {
  const [characterSate, setCharacterState] = useState({ [name]: value } as Record<string, string>);
  const [isReadOnly, setIsReadOnly] = useState(true);

  useEffect(() => {
    if (!isReadOnly) {
      const newObj = { ...item, ...characterSate };
      upDateFavouritiesObject(id, newObj);
    }
  }, [characterSate]);

  const handleEdit = () => {
    setIsReadOnly(!isReadOnly);
  };

  const handleInputValue = (e: React.KeyboardEvent) => {
    const inputValue = (e.target as HTMLInputElement).value;
    const inputId = (e.target as HTMLInputElement).id;
    setCharacterState({ [inputId]: inputValue });
  };

  const isEditable = ['height', 'gender'].includes(name);

  return (
    <div className="input-group input-group-sm mb-3">
      <button type="button" className="btn btn-sm" disabled>
        {name}
      </button>

      <input
        type="text"
        className="form-control"
        placeholder={name}
        aria-label={name}
        aria-describedby="basic-addon1"
        readOnly={!isEditable || isReadOnly}
        id={name}
        onChange={(e) => handleInputValue(e as unknown as React.KeyboardEvent)}
        value={characterSate[name]}
      />
      <div className="input-group-prepend">
        {['height', 'gender'].includes(name) && (
          <span
            className={`input-group-text btn ${isReadOnly ? 'btn-danger' : 'btn-success'}`}
            onClick={handleEdit}
            id={`edit-button-${name}`}
          >
            {isReadOnly ? 'edit' : 'save'}
          </span>
        )}
      </div>
    </div>
  );
};

function FavouritiesList({ listItem, handleRemoveCharacter }: Props): ReactElement {
  const { _id: characterId } = listItem;
  const favouritiesData: Idata | null = listItem[characterId] as unknown as Idata;

  const handleRemove = () => {
    handleRemoveCharacter(characterId);
  };
  return (
    !!favouritiesData && (
      <div className="row d-flex justify-content-center align-items-center">
        <img
          className="col-md-4  rounded-circle"
          style={{ maxHeight: '18rem' }}
          src={favouritiesData.imageUrl}
        ></img>
        <div className="col-md-6">
          <ul className="list-group">
            <li className="list-group-item">
              <InputElement
                id={characterId}
                item={favouritiesData}
                name={'name'}
                value={favouritiesData.name}
              />
            </li>
            <li className="list-group-item">
              <InputElement
                id={characterId}
                item={favouritiesData}
                name={'height'}
                value={favouritiesData.height}
              />
            </li>
            <li className="list-group-item">
              <InputElement
                id={characterId}
                item={favouritiesData}
                name={'gender'}
                value={favouritiesData.gender}
              />
            </li>
            <li className="list-group-item">
              <InputElement
                id={characterId}
                item={favouritiesData}
                name={'homeworld'}
                value={favouritiesData.homeworld}
              />
            </li>
          </ul>
        </div>
        <div className="col-md-2">
          <button type="button" className="btn btn-outline-danger" onClick={() => handleRemove()}>
            <span className="bi bi-trash"></span>Remove
          </button>
        </div>
      </div>
    )
  );
}

export default React.memo(FavouritiesList);
