/**
 * skenario test
 * 
 * - asyncAddThread thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 * 
 * - asyncChangeVoteThread thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 * 
 */

import { describe, beforeEach, afterEach, it, vi, expect, } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncAddThread, asyncChangeVoteThread, addThreadActionCreator, changeVoteThreadActionCreator } from './action';


const payloadAddThread = { 
  title: 'ini title', 
  body: 'ini body', 
  category: 'ini category'
};

const payloadChangeVoteThread = { 
  threadId: 'thread-1', 
  voteType: 1 
}

const fakeAuthUser = {
  "id": "users-1",
  "name": "John Doe",
  "email": "john@example.com",
  "avatar": "https://generated-image-url.jpg"
}

const fakeThread = {
  "id": "thread-1",
  "title": "Thread Pertama",
  "body": "Ini adalah thread pertama",
  "category": "General",
  "createdAt": "2021-06-21T07:00:00.000Z",
  "ownerId": "users-1",
  "upVotesBy": [],
  "downVotesBy": [],
  "totalComments": 0
}

const fakeGetState = {
  authUser: fakeAuthUser
}

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
  });
 
  afterEach(() => {
    api.createThread = api._createThread;
 
    // delete backup data
    delete api._createThread;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.createThread = () => Promise.resolve(fakeThread);
    // mock dispatch
    const dispatch = vi.fn();
 
    // action
    await asyncAddThread(payloadAddThread)(dispatch);
 
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeThread));
  });


  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.createThread = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock alert
    window.alert = vi.fn();
 
    // action
    await asyncAddThread(payloadAddThread)(dispatch);
 
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncChangeVoteThread thunk', () => {
  beforeEach(() => {
    api._changeVoteThread = api.changeVoteThread;
  });
 
  afterEach(() => {
    api.changeVoteThread = api._changeVoteThread;
 
    // delete backup data
    delete api._changeVoteThread;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.changeVoteThread = () => Promise.resolve();
    // mock dispatch
    const dispatch = vi.fn();
    const getState = () => (fakeGetState);
    // action
    await asyncChangeVoteThread(payloadChangeVoteThread)(dispatch, getState);
 
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).toHaveBeenCalledWith(changeVoteThreadActionCreator({...payloadChangeVoteThread, userId: fakeAuthUser.id}));
  });


  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.changeVoteThread = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    const getState = () => (fakeGetState);
    // mock alert
    window.alert = vi.fn();
 
    // action
    await asyncChangeVoteThread(payloadChangeVoteThread)(dispatch, getState);
 
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).toHaveBeenCalledWith(changeVoteThreadActionCreator({...payloadChangeVoteThread, userId: fakeAuthUser.id}));
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});