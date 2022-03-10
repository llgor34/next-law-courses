import Head from 'next/head';
import PopupCtxProvider from '../contexts/popupCtx/PopupCtx';
import AuthContextProvider from '../contexts/authCtx/AuthCtx';
import Navbar from '../nav/Navbar';
import { useRouter } from 'next/router';

function useRegex(input) {
  let regex = new RegExp('^/panel', 'i');
  return !regex.test(input);
}

const Layout = ({ children }) => {
  const router = useRouter();

  // On review page or any page starting with /panel/ , this nav shouldn't be visible
  const shouldDisplayPrimary = useRegex(router.pathname);

  return (
    <AuthContextProvider>
      <PopupCtxProvider>
        <Head>
          <title>PomocPrawna.Nieruchomości</title>
        </Head>
        {shouldDisplayPrimary && <Navbar />}
        {children}
        {shouldDisplayPrimary && (
          <footer className="footer">Powered by Micro-Hosting.eu</footer>
        )}
      </PopupCtxProvider>
    </AuthContextProvider>
  );
};

export default Layout;
