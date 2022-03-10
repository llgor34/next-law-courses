import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Rating from '@material-ui/lab/Rating';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

let initialCheck = true;

const Form = () => {
  const router = useRouter();
  const [rating, setRating] = useState(1);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(null);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = useCallback(() => {
    if (name.trim().length === 0) {
      setNameError('Proszę wprowadzić Imię');
      return;
    }
  }, [name]);

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (nameError) return;

    const obj = JSON.stringify({
      author: name,
      content,
      rating,
      collection: 'reviews',
    });

    fetch(`http://localhost:3000/api/createDoc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: obj,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 'success') {
          setIsLoading(false);
          router.push('/');
        }
      });
  };

  useEffect(() => {
    const ref = setTimeout(() => {
      setNameError(null);
      if (initialCheck) {
        initialCheck = false;
        return;
      }
      validateForm();
    }, 500);

    return () => clearInterval(ref);
  }, [validateForm]);

  return (
    <FormControl className="form">
      <TextField
        name="name"
        id="filled-basic"
        label="Imie"
        variant="filled"
        size="small"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={nameError ? true : false}
        required
      />
      <Rating
        onChange={(e, rate) => setRating(rate)}
        ratingValue={rating}
        defaultValue={1}
        max={5}
        precision={1}
        name="rating-stars"
        style={{ margin: 'auto' }}
      />
      <TextareaAutosize
        minRows={5}
        className="text-area"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        name="content"
      />
      <form onSubmit={handleSubmit}>
        <button className="btn">
          <span onClick={validateForm}>
            <LoadingButton
              variant="contained"
              color="primary"
              loading={isLoading}
            >
              Prześlij
            </LoadingButton>
          </span>
        </button>
      </form>
    </FormControl>
  );
};

export default Form;
