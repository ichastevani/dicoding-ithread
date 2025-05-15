import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncAddComment,
  asyncChangeVoteComment,
  asyncChangeVoteThreadDetail,
  asyncReceiveThreadDetail,
} from '../states/threadDetail/action';
import ThreadDetail from '../components/ThreadDetail';

function HalamanDetail() {
  const { id } = useParams();
  const { threadDetail = null, authUser } = useSelector((states) => states);
  const triggerAction = useDispatch();

  useEffect(() => {
    if (id) {
      triggerAction(asyncReceiveThreadDetail(id));
    }
  }, [id, triggerAction]);

  const onChangeVoteThreadDetail = (voteType, threadId, userId) => {
    triggerAction(asyncChangeVoteThreadDetail(voteType, threadId, userId));
  };

  const onAddThreadComment = (content) => {
    triggerAction(asyncAddComment(content));
  };

  const onChangeVoteComment = ({
    commentId, voteType, userId, threadId,
  }) => {
    triggerAction(asyncChangeVoteComment({
      commentId, voteType, userId, threadId,
    }));
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mb-3">
          <ThreadDetail
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...threadDetail}
            userId={authUser.id}
            onChangeVoteThreadDetail={onChangeVoteThreadDetail}
            onAddThreadComment={onAddThreadComment}
            onChangeVoteComment={onChangeVoteComment}
            threadId={threadDetail.id}
          />
        </div>
      </div>
    </div>
  );
}

export default HalamanDetail;
