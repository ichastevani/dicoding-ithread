import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import ThreadCommentItem, { commentItemShape } from './ItemKomentar';
import {
  asyncChangeVoteComment,
} from '../states/threadDetail/action';

function ListKomentar({
  userId, comments, threadId,
}) {
  const triggerAction = useDispatch();
  const onChangeVoteComment = ({
    commentId, voteType,
  }) => {
    triggerAction(asyncChangeVoteComment({
      commentId, voteType, userId, threadId,
    }));
  };

  return (
    <div>
      <h5>
        Comentar (
        {comments.length}
        )
      </h5>

      {comments.map((comment) => (
        <ThreadCommentItem
          key={comment.id}
          id={comment.id}
          content={comment.content}
          createdAt={comment.createdAt}
          owner={comment.owner}
          upVotesBy={comment.upVotesBy}
          downVotesBy={comment.downVotesBy}
          timestamp={comment.timestamp}
          userId={userId}
          onChangeVoteComment={onChangeVoteComment}
        />
      ))}
    </div>
  );
}

ListKomentar.propTypes = {
  userId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired,
  threadId: PropTypes.string.isRequired,
};

export default ListKomentar;
