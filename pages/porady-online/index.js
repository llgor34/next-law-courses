import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-nextjs-toast';

const online_tips = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [textError, setTextError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isEmpty = (string) => {
    return string.trim().length === 0;
  };

  const isValidEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const showMessage = (title, message, type = 'success') => {
    toast.notify(message, {
      duration: 5,
      type,
      title,
    });
  };

  useEffect(() => {
    let isMounted = true;
    if (!isMounted) return;

    if (nameError) {
      showMessage('Błąd!', nameError, 'error');
      return;
    }
    if (emailError) {
      showMessage('Błąd!', emailError, 'error');
      return;
    }
    if (textError) {
      showMessage('Błąd!', textError, 'error');
      return;
    }

    return () => (isMounted = false);
  }, [nameError, emailError, textError]);

  const clickHandler = () => {
    if (isEmpty(name)) {
      setNameError('Proszę wprowadzić imię!');
      return;
    }
    setNameError(null);

    if (isEmpty(email) || !isValidEmail(email)) {
      setEmailError('Proszę wprowadzić poprawny adres e-mail!');
      return;
    }
    setEmailError(null);

    if (isEmpty(text)) {
      setTextError('Proszę wprowadzić treść wiadomości!');
      return;
    }
    setTextError(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    fetch('http://localhost:3000/api/sendemail', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name,
        emailFrom: email,
        userMessage: text,
      }),
    })
      .then((res) => res.json())
      // .then((message) => console.log(message))
      .then((message) => {
        setName('');
        setEmail('');
        setText('');
        toast.notify('Wiadomość została wysłana pomyślnie!', {
          duration: 5,
          type: 'success',
          title: 'Sukces!',
        });
      })
      .catch((err) => {
        toast.notify(err.message, {
          duration: 5,
          type: 'error',
          title: 'Wystąpił błąd!',
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="tips-main-container">
      <ToastContainer align="center" position="bottom" />
      <div className="tips-header">
        👋 Witaj <br />
        <br />
        Jeżeli potrzebujesz pomocy <br /> KONTAKTUJ SIĘ Z NAMI PRZEZ FORMULARZ
        PONIŻEJ <br /> ODEZWIEMY SIĘ DO CIEBIE I POMOŻEMY ROZWIĄZAĆ TWÓJ PROBLEM
        😀
      </div>
      <hr />
      <form className="tips-inputs" onSubmit={submitHandler}>
        <div className="center-tips">
          <div className="tips-inputs-1">
            <label className="tips-icon">🤵</label>
            <input
              type="text"
              className="tips-inp1"
              placeholder="Twoje Imię"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></input>
          </div>
          <div className="tips-inputs-1">
            <lable className="tips-icon">📧</lable>
            <input
              type="email"
              className="tips-inp1"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
          </div>
        </div>
        <textarea
          type="text"
          className="tips-inp2"
          placeholder="💬 Twoje zapytanie"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>

        {/* please style this button properly */}
        {/* disabled controls if user can click button while sending message */}
        <button
          type="submit"
          className="tips-btn"
          disabled={isLoading}
          onClick={clickHandler}
        >
          Wyślij
        </button>
      </form>
    </div>
  );
};

export default online_tips;
