import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa6';
import { postedAt } from '../utils';
import InputKomentarThread from './InputanKomentar';
import { userShape, commentItemShape } from './ItemKomentar';
import ListKomentarThread from './ListKomentar';

function ThreadDetail({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  comments,
  userId,
  onChangeVoteThreadDetail,
  onAddThreadComment,
  onChangeVoteComment,
  threadId,
}) {
  const [isUserUpVotes, setIsUserUpVotes] = React.useState(false);
  const [isUserDownVotes, setIsUserDownVotes] = React.useState(false);

  React.useEffect(() => {
    setIsUserUpVotes(upVotesBy.includes(userId));
    setIsUserDownVotes(downVotesBy.includes(userId));
  }, [upVotesBy, downVotesBy, userId]);

  const handlerUpVote = (event) => {
    event.stopPropagation();
    const userVoteStatus = isUserUpVotes ? 0 : 1;
    onChangeVoteThreadDetail(userVoteStatus, threadId, userId);
  };

  const handlerDownVote = (event) => {
    event.stopPropagation();
    const userVoteStatus = isUserDownVotes ? 0 : -1;
    onChangeVoteThreadDetail(userVoteStatus, threadId, userId);
  };

  const styles = {
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
    profileName: {
      fontWeight: 'bold',
      fontSize: '1.2em',
    },
    profileTime: {
      fontSize: '0.9em',
      color: '#666',
    },
    title: {
      fontSize: '1.8em',
      color: '#333',
      marginBottom: '10px',
      fontWeight: 'bold',
    },
  };
  return (
    <div
      id={id}
      className="card row-hover pos-relative py-3 px-3 mb-3 border-primary border-top-0 border-right-0 border-bottom-0 rounded-0"
    >
      <div className="row align-items-center">
        <div className="col-12">
          {/* Profile Section moved to the top */}
          <div style={styles.profileContainer}>
            <img
              className="thread-avatar"
              src={owner.avatar}
              alt={`avatar ${owner.name}`}
              style={styles.profileImage}
            />
            <div>
              <span style={styles.profileName}>{owner.name}</span>
              <br />
              <span className="text-muted" style={styles.profileTime}>
                {postedAt(createdAt)}
                {' '}
                ago
              </span>
            </div>
          </div>
          {/* Title and Body */}
          <h3 className="text-primary" style={styles.title}>
            {title}
          </h3>
          <hr />
          <div className="text-sm op-5">
            <Link
              className="btn btn-sm btn-outline-secondary mr-2"
              to={`/threads/category/${category}`}
            >
              {`#${category}`}
            </Link>
          </div>
          <div>{body}</div>

          {/* Voting */}
          <div className="d-flex justify-content-between mt-3">
            <div>
              <button
                type="button"
                aria-label="onChangeVote"
                className={`btn btn-sm ${isUserUpVotes ? 'text-primary' : ''}`}
                onClick={handlerUpVote}
              >
                <FaThumbsUp />
                {' '}
                {upVotesBy.length}
              </button>
              <button
                type="button"
                aria-label="onChangeVote"
                className={`btn btn-sm ${isUserDownVotes ? 'text-primary' : ''}`}
                onClick={handlerDownVote}
              >
                <FaThumbsDown />
                {' '}
                {downVotesBy.length}
              </button>
            </div>
          </div>
          <hr />
          <div>
            <InputKomentarThread onAddThreadComment={onAddThreadComment} />
          </div>
          <div>
            <ListKomentarThread
              userId={userId}
              comments={comments}
              onChangeVoteComment={onChangeVoteComment}
              threadId={threadId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const threadDetail = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired,
  userId: PropTypes.string.isRequired,
  threadId: PropTypes.string.isRequired,
};

ThreadDetail.propTypes = {
  ...threadDetail,
  onChangeVoteThreadDetail: PropTypes.func,
  onAddThreadComment: PropTypes.func,
  onChangeVoteComment: PropTypes.func,
};

ThreadDetail.defaultProps = {
  onChangeVoteThreadDetail: null,
  onAddThreadComment: null,
  onChangeVoteComment: null,
};

export default ThreadDetail;
