import React, { ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { appendImgUrl } from '../../Utils/util';

interface Props {
  character: Record<string, string>;
}

function Character({ character }: Props): ReactElement {
  const navigate = useNavigate();
  const location = useLocation();

  const { imageUrl } = appendImgUrl(character);
  const characterId = character.url.split('/')[character.url.split('/').length - 2];
  return (
    <div className="col-12 col-md-3 col-lg-3 mb-4">
      <div className="card border border-warning" id={characterId}>
        <img className="card-img-top" src={imageUrl} alt="Card image cap" id={characterId}></img>
        <div className="card-body" id={characterId}>
          <h5 className="card-title text-capitalize" id={characterId}>
            {character.name}
          </h5>
          <button
            onClick={() => {
              if (characterId) navigate(`${location.pathname}/${characterId}`);
            }}
            className="btn btn-warning"
          >
            Go to Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Character);
