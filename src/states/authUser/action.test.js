// src/__tests__/action.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { 
  setAuthUserActionCreator, 
  unsetAuthUserActionCreator, 
  asyncSetAuthUser, 
  asyncUnsetAuthUser, 
  ActionType 
} from './action';

// Test data
const fakeAccessToken = 'random-token';
const fakeUserResponse = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};
const fakeErrorResponse = new Error('Ups, something went wrong');
const payloadLogin = { email: 'email@example.com', password: 'secret' };

describe('action creators', () => {
  it('setAuthUserActionCreator should create correct action', () => {
    const action = setAuthUserActionCreator(fakeUserResponse);
    expect(action).toEqual({
      type: ActionType.SET_AUTH_USER,
      payload: { authUser: fakeUserResponse },
    });
  });

  it('unsetAuthUserActionCreator should create correct action', () => {
    const action = unsetAuthUserActionCreator();
    expect(action).toEqual({
      type: ActionType.UNSET_AUTH_USER,
      payload: { authUser: null },
    });
  });
});

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    // Mocking window.alert to prevent ReferenceError in Node.js
    global.alert = vi.fn();  // Mock alert globally

    // Backup original functions
    api._login = api.login;
    api._putAccessToken = api.putAccessToken;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    // Restore original functions
    api.login = api._login;
    api.putAccessToken = api._putAccessToken;
    api.getOwnProfile = api._getOwnProfile;

    // Clean up after each test
    vi.restoreAllMocks();
    delete api._login;
    delete api._putAccessToken;
    delete api._getOwnProfile;
    delete global.alert;  // Clean up the mock alert
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Mock implementations
    api.login = vi.fn(() => Promise.resolve(fakeAccessToken));
    api.putAccessToken = vi.fn();
    api.getOwnProfile = vi.fn(() => Promise.resolve(fakeUserResponse));

    const dispatch = vi.fn();

    // Call async thunk
    await asyncSetAuthUser(payloadLogin)(dispatch);

    // Verify dispatch calls
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUserResponse));
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // Mock failed login
    api.login = vi.fn(() => Promise.reject(fakeErrorResponse));
    api.putAccessToken = vi.fn();
    api.getOwnProfile = vi.fn(() => Promise.resolve(fakeErrorResponse));

    const dispatch = vi.fn();

    // Call async thunk
    await asyncSetAuthUser(payloadLogin)(dispatch);

    // Verify dispatch calls and alert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(global.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncUnsetAuthUser thunk', () => {
  beforeEach(() => {
    // Backup original function
    api._putAccessToken = api.putAccessToken;
  });

  afterEach(() => {
    // Restore original function
    api.putAccessToken = api._putAccessToken;

    // Clean up after each test
    delete api._putAccessToken;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Mock implementation
    api.putAccessToken = vi.fn();
    const dispatch = vi.fn();

    // Call async thunk
    await asyncUnsetAuthUser()(dispatch);

    // Verify dispatch calls
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
  });
});
