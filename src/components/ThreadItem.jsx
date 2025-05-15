import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaComments, FaThumbsUp, FaThumbsDown } from 'react-icons/fa6';
import { postedAt } from '../utils';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  downVotesBy,
  upVotesBy,
  totalComments,
  owner,
  userId,
  onChangeVote,
}) {
  const [isUserUpVotes, setIsUserUpVotes] = React.useState(false);
  const [isUserDownVotes, setIsUserDownVotes] = React.useState(false);

  React.useEffect(() => {
    setIsUserUpVotes(upVotesBy.includes(userId));
    setIsUserDownVotes(downVotesBy.includes(userId));
  }, [upVotesBy, downVotesBy, userId]);

  const handlerUpVote = (event) => {
    event.stopPropagation();
    const voteType = isUserUpVotes ? 0 : 1;
    onChangeVote({ threadId: id, voteType, userId });
  };

  const handlerDownVote = (event) => {
    event.stopPropagation();
    const voteType = isUserDownVotes ? 0 : -1;
    onChangeVote({ threadId: id, voteType, userId });
  };

  return (
    <div
      className="card row-hover pos-relative py-3 px-3 mb-3 border-primary border-top-20 border-right-10 border-bottom-10 rounded-10"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: '500px',
        margin: '0 auto',
      }}
    >
      <div className="row align-items-center">
        <div className="col-12">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '15px',
            }}
          >
            <img
              className="thread-avatar"
              src={owner.avatar}
              alt={`avatar ${owner.name}`}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginRight: '10px',
              }}
            />
            <div>
              <span style={{ fontWeight: 'bold', fontSize: '1em' }}>
                {owner.name}
              </span>
              <br />
              <span className="text-muted" style={{ fontSize: '0.9em' }}>
                {postedAt(createdAt)}
                {' '}
                ago
              </span>
            </div>
          </div>

          <h5>
            <Link
              to={`/threads/${id}`}
              className="text-primary"
              style={{ fontWeight: 'bold' }}
            >
              {title}
            </Link>
          </h5>
          <hr />
          <div>
            {body.slice(0, 150)}
            ...
          </div>

          <div style={{ marginTop: '10px' }}>
            <Link
              to={`/threads/category/${category}`}
              className="btn btn-sm btn-outline-secondary"
              style={{ fontSize: '0.85em' }}
            >
              {`#${category}`}
            </Link>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <div>
              <button
                type="button"
                aria-label="onChangeVote"
                className={`btn btn-sm ${isUserUpVotes ? 'text-primary' : ''}`}
                onClick={handlerUpVote}
                style={{ marginRight: '10px' }}
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
                style={{ marginRight: '10px' }}
              >
                <FaThumbsDown />
                {' '}
                {downVotesBy.length}
              </button>
              <span className="btn btn-sm cursor-default">
                <FaComments />
                {' '}
                {totalComments}
              </span>
            </div>
          </div>
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

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  onChangeVote: PropTypes.func,
};

ThreadItem.defaultProps = {
  onChangeVote: null,
};

// eslint-disable-next-line react-refresh/only-export-components
export { threadItemShape };

export default ThreadItem;
