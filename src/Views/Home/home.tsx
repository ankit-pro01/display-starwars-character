import React, { ReactElement } from 'react';

interface Props {}

export default function Home({}: Props): ReactElement {
  return (
    <div className="container-fluid">
      <img
        style={{ width: '100%', height: '100%' }}
        src={`https://bestanimations.com/media/star-wars/1037554235star-wars-animated-gif-32.gif`}
      ></img>
    </div>
  );
}
