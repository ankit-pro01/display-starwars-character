import React, { ReactElement } from 'react';

interface Props {
  filterCharacterList: (a: string) => void;
}

function SearchComponent({ filterCharacterList }: Props): ReactElement {
  const handleSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = (e.target as HTMLInputElement).value;
    filterCharacterList(newValue);
  };

  return (
    <form className="form-inline my-2 my-lg-0 d-flex">
      <input
        className="form-control mr-sm-2 border border-warning"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={handleSearchInput}
      />
    </form>
  );
}

export default React.memo(SearchComponent);
