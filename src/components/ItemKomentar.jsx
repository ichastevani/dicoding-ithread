import React from 'react';
import PropTypes from 'prop-types';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa6';
import { postedAt } from '../utils';

function ItemKomentar({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  userId,
  onChangeVoteComment,
}) {
  const [isUserUpVotes, setIsUserUpVotes] = React.useState(false);
  const [isUserDownVotes, setIsUserDownVotes] = React.useState(false);

  React.useEffect(() => {
    setIsUserUpVotes(upVotesBy.includes(userId));
    setIsUserDownVotes(downVotesBy.includes(userId));
  }, [upVotesBy, downVotesBy, userId]);

  const handlerUserUpVote = (event) => {
    event.stopPropagation();
    const userVoteStatus = isUserUpVotes ? 0 : 1;
    onChangeVoteComment({
      commentId: id, voteType: userVoteStatus,
    });
  };

  const handlerUserDownVote = (event) => {
    event.stopPropagation();
    const userVoteStatus = isUserDownVotes ? 0 : -1;
    onChangeVoteComment({
      commentId: id, voteType: userVoteStatus,
    });
  };

  const styles = {
    card: {
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      padding: '15px',
    },
    profileContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '15px',
    },
    profileImage: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginRight: '10px',
    },
    profileDetails: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    profileName: {
      fontWeight: 'bold',
      fontSize: '1.1em',
    },
    profileTime: {
      fontSize: '0.9em',
      color: '#666',
    },
    commentSection: {
      display: 'flex',
      flexDirection: 'column',
    },
    voteButtons: {
      display: 'flex',
      gap: '10px',
      marginTop: '10px',
    },
  };
  return (
    <div className="card" style={styles.card}>
      <hr />
      <div className="d-flex justify-content-between">
        <div style={styles.profileContainer}>
          <img
            className="thread-avatar"
            src={owner.avatar}
            alt={`avatar ${owner.name}`}
            style={styles.profileImage}
          />
          <div style={styles.profileDetails}>
            <span style={styles.profileName}>{owner.name}</span>
            <span className="text-muted" style={styles.profileTime}>
              {postedAt(createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div style={styles.commentSection}>
        <div>{content}</div>
        <div style={styles.voteButtons}>
          <button
            type="button"
            aria-label="onChangeVote"
            className={`btn btn-sm ${isUserUpVotes ? 'text-primary' : ''}`}
            onClick={handlerUserUpVote}
          >
            <FaThumbsUp />
            {' '}
            {upVotesBy.length}
          </button>
          <button
            type="button"
            aria-label="onChangeVote"
            className={`btn btn-sm ${isUserDownVotes ? 'text-primary' : ''}`}
            onClick={handlerUserDownVote}
          >
            <FaThumbsDown />
            {' '}
            {downVotesBy.length}
          </button>
        </div>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ItemKomentar.propTypes = {
  ...commentItemShape,
  userId: PropTypes.string.isRequired,
  onChangeVoteComment: PropTypes.func,
};

ItemKomentar.defaultProps = {
  onChangeVoteComment: null,
};

// eslint-disable-next-line react-refresh/only-export-components
export { userShape, commentItemShape };

export default ItemKomentar;
