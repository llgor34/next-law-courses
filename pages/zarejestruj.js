import { FaUserCircle } from 'react-icons/fa';
import { useRef, useState, useEffect } from 'react';
import { useSignup } from '../firebase-client/useSignup';
import { useRouter } from 'next/router';
import { useAuth } from '../firebase-client/useAuth';
import Link from 'next/link';

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const Register = () => {
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [fullnameError, setFullnameError] = useState(null);
  const { error, isPending, signup } = useSignup();
  const { user } = useAuth();
  const emailRef = useRef();
  const passRef = useRef();
  const fullnameRef = useRef();
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);
    setFullnameError(null);

    // get values from inputs
    const email = emailRef.current.value;
    const pass = passRef.current.value;
    const fullname = fullnameRef.current.value;

    // validate fullname
    const fullnameArray = fullname.split(' ');
    if (fullnameArray.length !== 2) {
      setFullnameError('Proszę podać Imię oraz Nazwisko oddzielone spacją!');
      return;
    }

    // validate email
    if (!validateEmail(email)) {
      setEmailError('Email jest niepoprawny!');
      return;
    }

    // validate password
    if (pass.trim().length === 0) {
      setPasswordError('Hasło musi składać się z przynajmniej 6 znaków!');
      return;
    }

    // signup
    emailRef.current.value = '';
    passRef.current.value = '';
    fullnameRef.current.value = '';

    await signup(email, pass, fullname);
  };

  useEffect(() => {
    if (user) {
      router.push('/panel');
    }
  }, [user]);

  return (
    <div className="login-form">
      <form onSubmit={submitHandler}>
        <span className="login-circle">
          <FaUserCircle size="20%" />
        </span>
        <header>Rejestracja</header>
        <input
          type="text"
          className="nick"
          placeholder="🤵 Imię i Nazwisko"
          ref={fullnameRef}
        ></input>
        {fullnameError && <p>{fullnameError}</p>}
        <input
          type="email"
          className="email-login"
          placeholder="📧 E-mail"
          ref={emailRef}
        ></input>
        {emailError && <p>{emailError}</p>}

        <input
          type="password"
          className="pass"
          placeholder="🔓 Hasło"
          ref={passRef}
        ></input>
        {passwordError && <p>{passwordError}</p>}

        <label className="checkbox-label">
          <input type="checkbox" required /> Akceptuje{' '}
          <a href="https://docs.google.com/document/d/1ggGVTap9bNIhTL7mGJTrNAD7iDjmkjVU2v4uy0E587o/edit?usp=sharing" target="_blank" className="regulamin">
            regulamin
          </a>
        </label>
        <p>{error && <p>{error}</p>}</p>
        <button type="submit" className="btn-login">
          {!isPending && <span>Zarejestruj</span>}
          {isPending && <span>Loading...</span>}
        </button>
      </form>
      <Link href="/zaloguj">
        <a className="reg">Logowanie</a>
      </Link>
    </div>
  );
};

export default Register;
