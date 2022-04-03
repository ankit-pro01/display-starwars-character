import React, { ReactElement, useEffect, useState } from 'react';
import { upDateFavouritiesObject } from '../../Utils/util';

interface Props {
  listItem: Record<string, string>;
  handleRemoveCharacter: (a: string) => void;
}

interface data {
  name: string;
  height: string;
  gender: string;
  homeworld: string;
  imageUrl: string;
}

interface InputProps {
  id: string;
  item: data;
  name: string;
  value: string;
}

const InputElement = ({ id, item, name, value }: InputProps): ReactElement => {
  const [characterSate, setCharacterState] = useState({ [name]: value } as Record<string, string>);
  const [isReadOnly, setIsReadOnly] = useState(true);

  useEffect(() => {
    if (!isReadOnly) {
      let newObj = { ...item, ...characterSate };
      upDateFavouritiesObject(id, newObj);
    }
  }, [characterSate]);

  const handleEdit = () => {
    setIsReadOnly(!isReadOnly);
  };

  const handleInputValue = (e: React.KeyboardEvent) => {
    const value = (e.target as HTMLInputElement).value;
    const name = (e.target as HTMLInputElement).id;
    setCharacterState({ [name]: value });
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
        placeholder="Username"
        aria-label="Username"
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
            id="basic-addon1"
          >
            {isReadOnly ? 'edit' : 'save'}
          </span>
        )}
      </div>
    </div>
  );
};

function FavouritiesList({ listItem, handleRemoveCharacter }: Props): ReactElement {
  const { _id } = listItem;
  const favouritiesData = listItem[_id] as unknown as data;

  const handleRemove = () => {
    handleRemoveCharacter(_id);
  };

  return (
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
              id={_id}
              item={favouritiesData}
              name={'name'}
              value={favouritiesData.name}
            />
          </li>
          <li className="list-group-item">
            <InputElement
              id={_id}
              item={favouritiesData}
              name={'height'}
              value={favouritiesData['height']}
            />
          </li>
          <li className="list-group-item">
            <InputElement
              id={_id}
              item={favouritiesData}
              name={'gender'}
              value={favouritiesData['gender']}
            />
          </li>
          <li className="list-group-item">
            <InputElement
              id={_id}
              item={favouritiesData}
              name={'homeworld'}
              value={favouritiesData['homeworld']}
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
  );
}

export default React.memo(FavouritiesList);
