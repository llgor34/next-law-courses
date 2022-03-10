import { useState, useRef, useEffect } from 'react';
import { useDoc } from '../../firebase-client/useDoc';
import { useStorage } from '../../firebase-client/useStorage';
import { Timestamp } from '../../firebase-client/config';
import Editor from '../createNews/Editor';
import { ToastContainer, toast } from 'react-nextjs-toast';

const isEmpty = (string) => {
  return string.trim().length === 0;
};

const AddCourse = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [price, setPrice] = useState(0);
  const photoRef = useRef();
  const movieRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const { createDoc: createPublicDoc } = useDoc('courses');
  const { createDoc: createPrivateDoc } = useDoc('movies');
  const { uploadFile: uploadPhoto } = useStorage('/images');
  const { uploadFile: uploadMovie } = useStorage('/movies');

  useEffect(() => {
    if (error) {
      toast.notify(error, {
        duration: 3,
        type: 'error',
        title: 'Wystąpił błąd!',
      });
    }
  }, [error]);

  const clean = () => {
    setTitle('');
    setContent('');
    setPrice('');
    photoRef.current.value = '';
    movieRef.current.value = '';
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (error) return;

    setIsLoading(true);
    try {
      const photoUrl = await uploadPhoto(photoRef.current.files[0], 'png');
      const movieUrl = await uploadMovie(movieRef.current.files[0], 'mp4');

      const publicDoc = await createPublicDoc({
        title,
        description: content,
        miniatureUrl: photoUrl,
        price,
        createdAt: Timestamp.fromDate(new Date()),
      });

      await createPrivateDoc(
        {
          movieUrl,
        },
        publicDoc.id
      );

      toast.notify('Aktualizacja aktualności może zająć kilka minut', {
        duration: 5,
        type: 'success',
        title: 'Pomyślnie dodano nowy kurs!',
      });

      clean();
      setIsLoading(false);
    } catch (error) {
      toast.notify(error.message, {
        duration: 5,
        type: 'error',
        title: 'Wystąpił błąd!',
      });
      clean();
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    // validate title
    setError(null);
    if (isEmpty(title)) {
      setError('Nie wprowadzono tytułu!');
      return;
    }

    // validate content
    if (isEmpty(content)) {
      setError('Nie wprowadzono opisu!');
      return;
    }

    // validate miniature
    if (
      !photoRef.current.files[0] ||
      photoRef.current.files[0].type !== 'image/png'
    ) {
      setError('Wybierz poprawne zdjęcie z rozszerzeniem PNG!');
      return;
    }

    const photoSize = (photoRef.current.files[0].size / 1024 / 1024).toFixed(2);
    if (photoSize > 4) {
      setError('Wielkość zdjęcia przekracza 4MB!');
      return;
    }

    // validate movie
    if (
      !movieRef.current.files[0] ||
      movieRef.current.files[0].type !== 'video/mp4'
    ) {
      setError('Wybierz poprawny filmik z rozszerzeniem MP4!');
      return;
    }

    const movieSize = (movieRef.current.files[0].size / 1024 / 1024).toFixed(2);
    if (movieSize > 100) {
      setError('Wielkość filmiku, nie może być większa niż 100MB!');
      return;
    }

    // validate price
    if (isEmpty(price + '')) {
      setError('Nie podano ceny!');
      return;
    }

    if (isNaN(price)) {
      setError('Cene należy zapisać w postaci numerycznej!');
      return;
    }

    if (price <= 0) {
      setError('Cena musi być większa od 0zł');
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
        <span>Podaj opis</span>
        <Editor onChange={onContentChange} />
        <br />
        <label>
          <span>Prześlij miniature (PNG)</span>
          <br />
          <input type="file" ref={photoRef} />
        </label>
        <label>
          <span>Prześlij filmik (MP4)</span>
          <br />
          <input type="file" ref={movieRef} />
        </label>
        <label>
          <span>Podaj cenę (w zł)</span>
          <br />
          <input
            type="text"
            placeholder="Tutaj podaj cenę"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
          />
        </label>
        {!isLoading && <button onClick={validateForm}>Utwórz</button>}
        {isLoading && <button disabled>Loading...</button>}
      </form>
    </div>
  );
};

export default AddCourse;
