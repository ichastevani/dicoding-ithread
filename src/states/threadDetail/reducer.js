import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;
    case ActionType.CHANGE_VOTE_THREAD_DETAIL:
      if (threadDetail.id === action.payload.threadId) {
        return {
          ...threadDetail,
          upVotesBy: action.payload.voteType === 1
            ? threadDetail.upVotesBy.concat([action.payload.userId])
            : threadDetail.upVotesBy.filter((id) => id !== action.payload.userId),
          downVotesBy: action.payload.voteType === -1
            ? threadDetail.downVotesBy.concat([action.payload.userId])
            : threadDetail.downVotesBy.filter((id) => id !== action.payload.userId),
        };
      }
      return threadDetail;
    case ActionType.RECEIVE_COMMENTS:
      return {
        ...threadDetail,
        comments: action.payload.comments,
      };
    case ActionType.ADD_COMMENT:
      return {
        ...threadDetail,
        comments: [action.payload.comment, ...threadDetail.comments],
      };
    case ActionType.CHANGE_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: action.payload.voteType === 1
                ? comment.upVotesBy.concat([action.payload.userId])
                : comment.upVotesBy.filter((id) => id !== action.payload.userId),
              downVotesBy: action.payload.voteType === -1
                ? comment.downVotesBy.concat([action.payload.userId])
                : comment.downVotesBy.filter((id) => id !== action.payload.userId),
            };
          }
          return comment;
        }),
      };
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
