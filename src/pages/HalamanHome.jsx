import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ThreadList from '../components/ThreadList';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncChangeVoteThread } from '../states/threads/action';
import ThreadPopularList from '../components/ThreadPopularList';
import PapanPeringkatList from '../components/PapanPeringkatList';

function HalamanHome() {
  const {
    users = [],
    threads = [],
    leaderboards = [],
    authUser,
  } = useSelector((states) => states);

  const { category } = useParams();
  const initiateAction = useDispatch();

  useEffect(() => {
    initiateAction(asyncPopulateUsersAndThreads());
  }, [initiateAction]);

  const onChangeVote = ({ threadId, voteType, userId }) => {
    initiateAction(asyncChangeVoteThread({ threadId, voteType, userId }));
  };

  const categoryTotal = {};
  threads.forEach((thread) => {
    const { cat } = thread;
    categoryTotal[cat] = (categoryTotal[cat] || 0) + 1;
  });
  const categoryPopular = Object.keys(categoryTotal).sort(
    (category1, category2) => categoryTotal[category1] - categoryTotal[category2],
  );

  const threadList = threads
    .filter((thread) => !category || category === thread.category)
    .map((thread) => ({
      ...thread,
      owner: users.find((user) => user.id === thread.ownerId),
    }));
  const styles = {
    container: {
      padding: '20px 0',
    },
    sidebarContainer: {
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    sidebarBox: {
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
      padding: '10px',
    },
    sectionTitle: {
      fontWeight: 'bold',
      fontSize: '1.2em',
      color: '#333',
      marginBottom: '10px',
    },
  };

  return (
    <section>
      <div className="container" style={styles.container}>
        <div className="row">
          <div className="col-lg-3 mb-4 mb-lg-0 px-lg-0 mt-lg-0">
            <div style={styles.sidebarContainer}>
              <div className="bg-white mb-3" style={styles.sidebarBox}>
                <h5 className="px-3 py-4" style={styles.sectionTitle}>
                  Popular Category
                </h5>
                <hr className="m-0" />
                <div className="px-3 py-3">
                  <ThreadPopularList
                    categoryPopular={categoryPopular}
                    currentCategory={category}
                  />
                </div>
              </div>

              <div className="bg-white text-sm pb-3" style={styles.sidebarBox}>
                <h5 className="px-3 py-4" style={styles.sectionTitle}>
                  Leader Board
                </h5>
                <hr className="my-0" />
                <div>
                  <PapanPeringkatList leaderboards={leaderboards} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9 mb-3">
            <ThreadList userId={authUser.id} threads={threadList} onChangeVote={onChangeVote} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HalamanHome;
