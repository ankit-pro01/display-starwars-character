import React, { ReactElement } from 'react';

export default function Home(): ReactElement {
  return (
    <div className="container-fluid">
      <img
        style={{ width: '100%', height: '100%' }}
        src={`https://bestanimations.com/media/star-wars/1037554235star-wars-animated-gif-32.gif`}
      ></img>
    </div>
  );
}
