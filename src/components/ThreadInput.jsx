/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ThreadInput({ onAddThread }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');

  function addThread() {
    if (title.trim() && body.trim()) {
      onAddThread({ title, body, category });
    }
  }

  function handleTitle({ target }) {
    if (target.value.length <= 50) {
      setTitle(target.value);
    }
  }

  function handleBody({ target }) {
    if (target.value.length <= 1000) {
      setBody(target.value);
    }
  }

  function handleCategory({ target }) {
    setCategory(target.value);
  }

  const styles = {
    card: {
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      maxWidth: '450px',
      margin: '0 auto',
    },
    cardBody: {
      padding: '20px',
    },
    title: {
      fontSize: '1.8em',
      color: '#333',
      marginBottom: '10px',
      fontWeight: 'bold',
    },
    hr: {
      marginBottom: '20px',
      borderColor: '#ddd',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    label: {
      fontSize: '1.1em',
      color: '#333',
      fontWeight: 'bold',
    },
    inputGroup: {
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      border: 'none',
      borderBottom: '2px solid #ccc',
      borderRadius: '0',
      padding: '10px',
      fontSize: '1em',
      marginBottom: '10px',
    },
    counter: {
      fontSize: '0.9em',
      color: '#999',
      textAlign: 'right',
    },
    submitButton: {
      backgroundColor: '#f57c00',
      borderColor: '#f57c00',
      color: '#fff',
      padding: '12px 25px',
      fontSize: '1.2em',
      fontWeight: 'bold',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
    },
  };

  return (
    <div className="card" style={styles.card}>
      <div className="card-body" style={styles.cardBody}>
        <h3 className="ps-2" style={styles.title}>
          Buat Thread
        </h3>
        <hr style={styles.hr} />
        <div className="form" style={styles.form}>
          <div className="mb-3" style={styles.formGroup}>
            <label htmlFor="inputTitle" className="form-label" style={styles.label}>
              Title
            </label>
            <input
              id="inputTitle"
              type="text"
              className="form-control"
              value={title}
              onChange={handleTitle}
            />
            <div className="text-end">
              <span style={styles.counter}>
                {title.length}
                /50
              </span>
            </div>
          </div>

          <div className="mb-3" style={styles.formGroup}>
            <label
              htmlFor="inputBody"
              className="form-label"
              style={styles.label}
            >
              Konten
            </label>
            <textarea
              rows="5"
              id="inputBody"
              onChange={handleBody}
              className="form-control"
              style={styles.input}
            />
            <div className="text-end">
              <span style={styles.counter}>
                {body.length}
                /1000
              </span>
            </div>
          </div>

          <div className="mb-3" style={styles.formGroup}>
            <label
              htmlFor="inputCategory"
              className="form-label"
              style={styles.label}
            >
              Kategori
            </label>
            <input
              type="text"
              id="inputCategory"
              onChange={handleCategory}
              className="form-control"
              style={styles.input}
            />
          </div>

          <div className="mb-4 text-end">
            <button
              type="button"
              onClick={addThread}
              className="btn btn-success btn-block"
              style={styles.submitButton}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ThreadInput.propTypes = {
  onAddThread: PropTypes.func.isRequired,
};

export default ThreadInput;
