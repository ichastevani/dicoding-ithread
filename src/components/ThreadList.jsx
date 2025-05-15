import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape } from './ThreadItem';

function ThreadList({ userId, threads, onChangeVote }) {
  return (
    <div>
      {threads.map((thread) => (
        <ThreadItem
          key={`thread-${thread.id}`}
          id={thread.id}
          title={thread.title}
          body={thread.body}
          category={thread.category}
          createdAt={thread.createdAt}
          downVotesBy={thread.downVotesBy}
          upVotesBy={thread.upVotesBy}
          totalComments={thread.totalComments}
          owner={thread.owner}
          userId={userId}
          onChangeVote={onChangeVote}
        />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  userId: PropTypes.string.isRequired,
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  onChangeVote: PropTypes.func.isRequired,
};

export default ThreadList;
