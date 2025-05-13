import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';
import { ActionType } from './action';

describe('threadDetailReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threadDetail when given by RECEIVE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: {
        threadDetail: {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
          comments: [
            {
              id: 'comment-1',
              content: 'Ini adalah komentar pertama',
              createdAt: '2021-06-21T07:00:00.000Z',
              owner: {
                id: 'users-1',
                name: 'John Doe',
                avatar: 'https://generated-image-url.jpg',
              },
              upVotesBy: [],
              downVotesBy: [],
            },
          ],
        },
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return null when given by CLEAR_THREAD_DETAIL action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: ActionType.CLEAR_THREAD_DETAIL,
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(null);
  });

  it('should return the threadsDetail with change upVoteBy and downVoteBy when given by CHANGE_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const threadId = 'thread-1';
    const initialState = {
      id: threadId,
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };

    const actionUpVote = {
      type: ActionType.CHANGE_VOTE_THREAD_DETAIL,
      payload: {
        threadId,
        voteType: 1,
        userId: 'user-1',
      },
    };
    const actionDownVote = {
      type: ActionType.CHANGE_VOTE_THREAD_DETAIL,
      payload: {
        threadId,
        voteType: -1,
        userId: 'user-1',
      },
    };
    const actionNeutralVote = {
      type: ActionType.CHANGE_VOTE_THREAD_DETAIL,
      payload: {
        threadId,
        voteType: 0,
        userId: 'user-1',
      },
    };

    // action: vote up thread
    const nextState = threadDetailReducer(initialState, actionUpVote);
    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [actionUpVote.payload.userId],
      downVotesBy: [],
    });

    // action: vote down thread
    const nextState2 = threadDetailReducer(nextState, actionDownVote);
    // assert
    expect(nextState2).toEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: [actionDownVote.payload.userId],
    });

    // action: vote neutral thread
    const nextState3 = threadDetailReducer(nextState, actionNeutralVote);
    // assert
    expect(nextState3).toEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: [],
    });
  });

  it('should return the threadDetail with update comments when given by RECEIVE_COMMENTS action', () => {
    // arrange
    const threadId = 'thread-1';
    const initialState = {
      id: threadId,
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.RECEIVE_COMMENTS,
      payload: {
        comments: [
          {
            id: 'comment-1',
            content: 'Ini adalah komentar pertama',
            createdAt: '2021-06-21T07:00:00.000Z',
            owner: {
              id: 'users-1',
              name: 'John Doe',
              avatar: 'https://generated-image-url.jpg',
            },
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: action.payload.comments,
    });
  });

  it('should return the threadDetail with the new comment when given by ADD_COMMENT action', () => {
    // arrange
    const threadId = 'thread-1';
    const initialState = {
      id: threadId,
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: {
        comment: {
          id: 'comment-2',
          content: 'Ini adalah komentar kedua',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [action.payload.comment, ...initialState.comments],
    });
  });

  it('should return the threadsDetail with update comments and change upVoteBy and downVoteBy when given by CHANGE_VOTE_COMMENT action', () => {
    // arrange
    const threadId = 'thread-1';
    const commentId = 'comment-1';
    const initialState = {
      id: threadId,
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: commentId,
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };

    const actionUpVote = {
      type: ActionType.CHANGE_VOTE_COMMENT,
      payload: {
        commentId,
        voteType: 1,
        userId: 'user-1',
      },
    };
    const actionDownVote = {
      type: ActionType.CHANGE_VOTE_COMMENT,
      payload: {
        commentId,
        voteType: -1,
        userId: 'user-1',
      },
    };
    const actionNeutralVote = {
      type: ActionType.CHANGE_VOTE_COMMENT,
      payload: {
        commentId,
        voteType: 0,
        userId: 'user-1',
      },
    };

    // action: vote up comments
    const nextState = threadDetailReducer(initialState, actionUpVote);
    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [actionUpVote.payload.userId],
          downVotesBy: [],
        },
      ],
    });

    // action: vote down comments
    const nextState2 = threadDetailReducer(nextState, actionDownVote);
    // assert
    expect(nextState2).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [],
          downVotesBy: [actionDownVote.payload.userId],
        },
      ],
    });

    // action: vote neutral comments
    const nextState3 = threadDetailReducer(nextState, actionNeutralVote);
    // assert
    expect(nextState3).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    });
  });
});
