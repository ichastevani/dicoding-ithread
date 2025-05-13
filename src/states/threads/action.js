import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
    RECEIVE_THREADS: 'threads/receive',
    ADD_THREAD: 'threads/add',
    CHANGE_VOTE_THREAD: 'threads/changeVote',
};

function receiveThreadsActionCreator(threads) {
    return {
        type: ActionType.RECEIVE_THREADS,
        payload: {
            threads,
        },
    };
}

function addThreadActionCreator(thread) {
    return {
        type: ActionType.ADD_THREAD,
        payload: {
            thread,
        },
    };
}

function changeVoteThreadActionCreator({ threadId, voteType, userId }) {
    return {
        type: ActionType.CHANGE_VOTE_THREAD,
        payload: {
            threadId,
            voteType,
            userId,
        },
    };
}

function asyncAddThread({ title, body, category }) {
    return async (dispatch) => {
        dispatch(showLoading());
        try {
            const thread = await api.createThread({ title, body, category });
            dispatch(addThreadActionCreator(thread));
        } catch (error) {
            alert(error.message);
        }
        dispatch(hideLoading());
    };
}

function asyncChangeVoteThread({ threadId, voteType }) {
    return async (dispatch, getState) => {
        dispatch(showLoading());
        const { authUser } = getState();
        dispatch(changeVoteThreadActionCreator({ threadId, voteType, userId: authUser.id }));

        try {
            await api.changeVoteThread({ threadId, voteType });
        } catch (error) {
            alert(error.message);
            dispatch(changeVoteThreadActionCreator({ threadId, voteType, userId: authUser.id }));
        }
        dispatch(hideLoading());
    };
}

export {
    ActionType,
    receiveThreadsActionCreator,
    changeVoteThreadActionCreator,
    addThreadActionCreator,
    asyncChangeVoteThread,
    asyncAddThread,
};
