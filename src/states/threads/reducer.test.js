/**
* test scenario for threadsReducer
*
* - threadsReducer function
*  - should return the initial state when given by unknown action
*  - should return the threads when given by RECEIVE_THREADS action
*  - should return the threads with the new talk when given by ADD_THREAD action
*  - should return the threads with change upVoteBy and downVoteBy when given by CHANGE_VOTE_THREAD action
*
*/

import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        "threads": [
          {
              "id": "thread-1",
              "title": "Thread Pertama",
              "body": "Ini adalah thread pertama",
              "category": "General",
              "createdAt": "2021-06-21T07:00:00.000Z",
              "ownerId": "users-1",
              "upVotesBy": [],
              "downVotesBy": [],
              "totalComments": 0
          },
          {
              "id": "thread-2",
              "title": "Thread Kedua",
              "body": "Ini adalah thread kedua",
              "category": "General",
              "createdAt": "2021-06-21T07:00:00.000Z",
              "ownerId": "users-2",
              "upVotesBy": [],
              "downVotesBy": [],
              "totalComments": 0
          }
        ]
      },
    };
 
    // action
    const nextState = threadsReducer(initialState, action);
 
    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with the new talk when given by ADD_THREAD action', ()=>{
    // arrange
    const initialState = [
      {
        "id": "thread-1",
        "title": "Thread Pertama",
        "body": "Ini adalah thread pertama",
        "category": "General",
        "createdAt": "2021-06-21T07:00:00.000Z",
        "ownerId": "users-1",
        "upVotesBy": [],
        "downVotesBy": [],
        "totalComments": 0
      },
    ];
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: {
          "id": "thread-2",
          "title": "Thread Kedua",
          "body": "Ini adalah thread kedua",
          "category": "General",
          "createdAt": "2021-06-21T07:00:00.000Z",
          "ownerId": "users-1",
          "upVotesBy": [],
          "downVotesBy": [],
          "totalComments": 0
        },
      },
    };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it('should return the threads with change upVoteBy and downVoteBy when given by CHANGE_VOTE_THREAD action', ()=>{
    // arrange
    const threadId = "thread-1";
    const initialState = [
      {
        "id": threadId,
        "title": "Thread Pertama",
        "body": "Ini adalah thread pertama",
        "category": "General",
        "createdAt": "2021-06-21T07:00:00.000Z",
        "ownerId": "users-1",
        "upVotesBy": [],
        "downVotesBy": [],
        "totalComments": 0
      },
    ];
    const actionUpVote = {
      type: ActionType.CHANGE_VOTE_THREAD,
      payload: {
        threadId,
        voteType: 1,
        userId: "user-1",
      },
    };
    const actionDownVote = {
      type: ActionType.CHANGE_VOTE_THREAD,
      payload: {
        threadId,
        voteType: -1,
        userId: "user-1",
      },
    };
    const actionNeutralVote = {
      type: ActionType.CHANGE_VOTE_THREAD,
      payload: {
        threadId,
        voteType: 0,
        userId: "user-1",
      },
    };

    // action: vote up thread
    const nextState = threadsReducer(initialState, actionUpVote);
    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [actionUpVote.payload.userId],
        downVotesBy: [],
      },
    ]);

    // action: vote down thread
    const nextState2 = threadsReducer(nextState, actionDownVote);
    // assert
    expect(nextState2).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: [actionDownVote.payload.userId],
      }
    ]);

    // action: vote neutral thread
    const nextState3 = threadsReducer(nextState, actionNeutralVote);
    // assert
    expect(nextState3).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: [],
      }
    ]);
  });
});