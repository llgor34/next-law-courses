import React, { useState, useEffect, useRef } from 'react';

const Editor = ({ onChange }) => {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  // When component mounts, windows object will exist
  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
    };
    setEditorLoaded(true);
  }, []);

  return editorLoaded ? (
    <div className="lato-font margin-top">
      <CKEditor
        editor={ClassicEditor}
        config={{
          removePlugins: ['EasyImage', 'ImageUpload', 'MediaEmbed'],
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  ) : (
    <div>Ładowanie...</div>
  );
};

export default Editor;
