/* eslint-disable no-alert */
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  CHANGE_VOTE_THREAD_DETAIL: 'CHANGE_VOTE_THREAD_DETAIL',
  RECEIVE_COMMENTS: 'RECEIVE_COMMENTS',
  ADD_COMMENT: 'ADD_COMMENT',
  CHANGE_VOTE_COMMENT: 'CHANGE_VOTE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function changeVoteThreadDetailActionCreator({ threadId, voteType, userId }) {
  return {
    type: ActionType.CHANGE_VOTE_THREAD_DETAIL,
    payload: {
      threadId,
      voteType,
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncChangeVoteThreadDetail(voteType, threadId, userId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(changeVoteThreadDetailActionCreator({
      threadId,
      voteType,
      userId,
    }));
    try {
      await api.changeVoteThread({ threadId, voteType });
    } catch (error) {
      alert(error.message);
      dispatch(changeVoteThreadDetailActionCreator({
        threadId,
        voteType,
        userId,
      }));
    }
    dispatch(hideLoading());
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function changeVoteCommentActionCreator({ commentId, voteType, userId }) {
  return {
    type: ActionType.CHANGE_VOTE_COMMENT,
    payload: {
      commentId,
      voteType,
      userId,
    },
  };
}

function asyncAddComment(content) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { threadDetail } = getState();
    try {
      const comment = await api.createComment({ threadId: threadDetail.id, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncChangeVoteComment({
  commentId, voteType, userId, threadId,
}) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(changeVoteCommentActionCreator({ commentId, voteType, userId }));

    try {
      await api.changeVoteComment({ threadId, commentId, voteType });
    } catch (error) {
      alert(error.message);
      // dispatch(changeVoteCommentActionCreator({ commentId, voteType, userId }));
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncChangeVoteThreadDetail,
  addCommentActionCreator,
  asyncChangeVoteComment,
  asyncAddComment,
};
