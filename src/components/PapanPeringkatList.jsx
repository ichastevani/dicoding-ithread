import React from 'react';
import PropTypes from 'prop-types';
import PapanPeringkatItem, { rankingDataSchema } from './PapanPeringkatItem';

function PapanPeringkatList({ leaderboards }) {
  return (
    <ul className="list-group list-group-flush">
      {leaderboards.map((leaderboard) => (
        <PapanPeringkatItem key={`leaderboard-${leaderboard.user.id}`} leaderboard={leaderboard} />
      ))}
    </ul>
  );
}

PapanPeringkatList.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.shape(rankingDataSchema))
    .isRequired,
};

export default PapanPeringkatList;
