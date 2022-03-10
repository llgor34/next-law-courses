import { FaUserCircle } from 'react-icons/fa';
import { useSignIn } from '../firebase-client/useSignin';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../firebase-client/useAuth';
import { validateEmail } from '../firebase-client/validateEmail';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Login = () => {
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const { signIn, error, isPending } = useSignIn();
  const { user } = useAuth();
  const router = useRouter();
  const emailRef = useRef();
  const passRef = useRef();

  // redirect logged user
  useEffect(() => {
    if (user) {
      router.push('/panel');
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);
    const email = emailRef.current.value;
    const pass = passRef.current.value;

    // validate email
    if (!validateEmail(email)) {
      setEmailError('Niepoprawny adres email!');
      return;
    }

    // validate password
    if (pass.trim().length < 6) {
      setPasswordError('Hasło musi mieć przynajmniej 6 znaków!');
      return;
    }

    // login
    emailRef.current.value = '';
    passRef.current.value = '';

    await signIn(email, pass);
  };
  return (
    <div className="login-form">
      <form onSubmit={submitHandler}>
        <span className="login-circle">
          <FaUserCircle size="20%" />
        </span>
        <header>Zaloguj</header>
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
        {error && <p>{error}</p>}
        <button type="submit" className="btn-login" disabled={isPending}>
          {!isPending && <span>Login</span>}
          {isPending && <span>Loading...</span>}
        </button>
      </form>
      <Link href="/zarejestruj">
        <a className="reg">Zarejestruj się</a>
      </Link>
    </div>
  );
};

export default Login;
