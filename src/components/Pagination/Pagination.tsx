import React, { Dispatch, ReactElement, SetStateAction } from 'react';

interface Props {
  handlePage: Dispatch<SetStateAction<number>>;
  page: number;
  hasNextPage: boolean;
}

function Pagination({ handlePage, page, hasNextPage }: Props): ReactElement {
  const adjustPage = (amount: number) => {
    handlePage((prevPage) => prevPage + amount);
  };

  page += 1;

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-end">
        {page !== 1 && (
          <li
            className="page-item page-link link-secondary"
            onClick={() => adjustPage(-1)}
            tabIndex={-1}
          >
            Previous
          </li>
        )}
        {page !== 1 && (
          <li
            className="page-item page-link link-secondary "
            onClick={() => handlePage(1)}
            tabIndex={-1}
          >
            1
          </li>
        )}

        <li className="page-item  page-link " style={{ backgroundColor: 'yellow', color: 'black' }}>
          {page}
        </li>

        {hasNextPage && (
          <li className="page-item page-link link-secondary " onClick={() => adjustPage(1)}>
            {page + 1}
          </li>
        )}
        {hasNextPage && (
          <li className="page-item page-link link-secondary" onClick={() => adjustPage(1)}>
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default React.memo(Pagination);
