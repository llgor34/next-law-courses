import { useState, useRef, useEffect } from 'react';
import { useDoc } from '../../firebase-client/useDoc';
import { useStorage } from '../../firebase-client/useStorage';
import Editor from './Editor';
import { ToastContainer, toast } from 'react-nextjs-toast';

const isEmpty = (string) => {
  return string.trim().length === 0;
};

const CreateNews = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const photoRef = useRef();
  const { createDoc } = useDoc('news');
  const { uploadFile } = useStorage('/images');

  const clean = () => {
    setTitle('');
    setContent('');
    setDueDate('');
  };

  useEffect(() => {
    if (error) {
      toast.notify(error, {
        duration: 3,
        type: 'error',
        title: 'Wystąpił błąd!',
      });
    }
  }, [error]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (error) return;
    setIsLoading(true);
    try {
      const photoUrl = await uploadFile(photoRef.current.files[0], 'png');
      await createDoc({
        imgUrl: photoUrl,
        dueDate,
        title,
        content,
      });
      toast.notify('Aktualizacja aktualności może zająć kilka minut', {
        duration: 5,
        type: 'success',
        title: 'Pomyślnie dodano nową aktualność!',
      });
      setIsLoading(false);
    } catch (error) {
      toast.notify(error.message, {
        duration: 5,
        type: 'error',
        title: 'Wystąpił błąd!',
      });
      setIsLoading(false);
    }
    clean();
  };

  const validateForm = () => {
    // validation goes here!
    setError(null);
    if (isEmpty(title)) {
      setError('Nie wprowadzono tytułu!');
      return;
    }

    if (isEmpty(content)) {
      setError('Nie wprowadzono treści!');
      return;
    }

    if (isEmpty(dueDate)) {
      setError('Nie wybrano daty szkolenia!');
      return;
    }

    if (
      !photoRef.current.files[0] ||
      photoRef.current.files[0].type !== 'image/png'
    ) {
      setError('Wybierz poprawne zdjęcie z rozszerzeniem PNG!');
      return;
    }

    // validate photo
    const photoSize = (photoRef.current.files[0].size / 1024 / 1024).toFixed(2);
    if (photoSize > 4) {
      setError('Wielkość zdjęcia przekracza 4MB!');
      return;
    }
  };

  const onContentChange = (data) => {
    setContent(data);
  };

  return (
    <div className="p-add-post">
      <ToastContainer align="center" position="bottom" />
      <form onSubmit={handleFormSubmit}>
        <label>
          <span>Podaj tytul</span>
          <br />
          <input
            type="text"
            placeholder="Tutaj podaj tytul"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <span>Podaj treść</span>
        <Editor onChange={onContentChange} />
        <br />
        <label>
          <span>Podaj termin</span>
          <br />

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
        <label>
          <span>Prześlij zdjęcie</span> <br />
          <input type="file" ref={photoRef} />
        </label>
        {!isLoading && <button onClick={validateForm}>Utwórz</button>}
        {isLoading && <button disabled>Loading...</button>}
      </form>
    </div>
  );
};

export default CreateNews;
