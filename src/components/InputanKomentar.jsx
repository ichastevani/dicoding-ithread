import React, { useState } from 'react';
import PropTypes from 'prop-types';

function InputKomentarThread({ onAddThreadComment }) {
  const [content, setContent] = useState('');

  function addThreadComment() {
    if (content.trim()) {
      onAddThreadComment(content);
      setContent('');
    }
  }
  function handleContent({ target }) {
    if (target.value.length <= 350) {
      setContent(target.value);
    }
  }

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between">
          <h5>Beri Komentar</h5>
          <span>
            {content.length}
            /350
          </span>
        </div>
        <textarea
          rows="5"
          id="inputBody"
          onChange={handleContent}
          value={content}
          className="form-control"
        />
      </div>
      <div className="mb-4 mt-3 text-end">
        <button
          type="button"
          onClick={addThreadComment}
          className="btn btn-dark btn-block"
          style={{
            backgroundColor: '#f57c00',
            borderColor: '#f57c00',
            color: 'white',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

InputKomentarThread.propTypes = {
  onAddThreadComment: PropTypes.func.isRequired,
};

export default InputKomentarThread;
