import '../styles/global.css';
import Layout from '../components/layout/Layout';
import CookieConsent from 'react-cookie-consent';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <CookieConsent
        location="bottom"
        buttonText="Zaakceptuj"
        cookieName="acceptedCookies"
        style={{ background: '#2B373B', display: 'flex', alignItems: 'center' }}
        buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
        expires={150}
      >
        🍪 Ta strona używa plików Cookie
      </CookieConsent>
    </Layout>
  );
}

export default MyApp;
