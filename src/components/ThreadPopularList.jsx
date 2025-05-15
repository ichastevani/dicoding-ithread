import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ThreadPopularList({ categoryPopular, currentCategory }) {
  return (
    <div className="d-flex justify-content-center flex-wrap gap-2">
      {categoryPopular.map((category, key) => (currentCategory === category ? (
        // eslint-disable-next-line react/no-array-index-key
        <Link key={`popular-${key}`} className="btn btn-sm btn-success" to="/">
          {`#${category}`}
        </Link>
      ) : (
        <Link
          // eslint-disable-next-line react/no-array-index-key
          key={`popular-${key}`}
          className="btn btn-sm btn-outline-success"
          to={`/threads/category/${category}`}
        >
          {`#${category}`}
        </Link>
      )))}
    </div>
  );
}

ThreadPopularList.propTypes = {
  categoryPopular: PropTypes.arrayOf(PropTypes.string).isRequired,
  // eslint-disable-next-line react/require-default-props
  currentCategory: PropTypes.string,
};

export default ThreadPopularList;
