import React from 'react';
import PropTypes from 'prop-types';

function PapanPeringkatItem({ leaderboard }) {
  const styles = {
    listItem: {
      backgroundColor: '#fff',
      padding: '12px',
      marginBottom: '8px',
      borderRadius: '15px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      fontSize: '1.2em',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    avatar: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      objectFit: 'cover',
    },
    name: {
      fontWeight: 'bold',
      color: '#333',
      fontSize: '1.1em',
    },
    score: {
      color: '#fff',
      backgroundColor: '#f57c00',
      borderRadius: '20px',
      padding: '8px 15px',
      fontSize: '1em',
      textAlign: 'center',
    },
  };
  return (
    <li
      className="list-group-item d-flex justify-content-between align-items-center"
      style={styles.listItem}
    >
      <div className="d-flex align-items-center">
        <img
          className="leaderboard-avatar"
          src={leaderboard.user.avatar}
          alt={`avatar ${leaderboard.user.name}`}
          style={styles.avatar}
        />
        <span className="ps-2" style={styles.name}>
          {leaderboard.user.name}
        </span>
      </div>
      <span className="leaderboard-score" style={styles.score}>
        {leaderboard.score}
      </span>
    </li>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const rankingDataSchema = {
  user: PropTypes.shape(userShape).isRequired,
  score: PropTypes.number.isRequired,
};

PapanPeringkatItem.propTypes = {
  leaderboard: PropTypes.shape(rankingDataSchema).isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export { rankingDataSchema };

export default PapanPeringkatItem;
