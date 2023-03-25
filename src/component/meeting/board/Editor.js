import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styles from 'assets/css/component/meeting/Board.module.css';

function Editor({ handleSubmit, content, setContent }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CKEditor
          editor={ClassicEditor}
          config={{
            placeholder: '내용을 입력하세요.',
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
        />
        <button type='submit'>글쓰기</button>
      </form>
    </div>
  );
}

export default Editor;
