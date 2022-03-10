import Navlink from '../navlink/Navlink';
import Link from 'next/link';
import { useAuth } from '../../firebase-client/useAuth';
import { useAdmin } from '../../firebase-client/useAdmin';

const PanelNavbar = () => {
  const { logout } = useAuth();
  const { isAdmin } = useAdmin();

  return (
    <nav class="p-nav">
      <div class="p-logo">
        <Link href="/">
          <img src="/static/logo.png" style={{ cursor: 'pointer' }} />
        </Link>
      </div>
      <div className="p-links">
        <Navlink href="/panel" className="p-btn">
          Wszystkie kursy
        </Navlink>
        <Navlink href="/panel/moje-kursy" className="p-btn">
          Moje kursy
        </Navlink>
        {isAdmin && (
          <>
            <Navlink href="/panel/zarzadzanie-uzytkownikami" className="p-btn">
              Zarządzaj użytkownikami
            </Navlink>
            <Navlink href="/panel/dodaj-kurs" className="p-btn">
              Dodaj kurs
            </Navlink>
            <Navlink href="/panel/dodaj-aktualnosc" className="p-btn">
              Dodaj aktualność
            </Navlink>
            <Navlink href="/panel/dodaj-szkolenie" className="p-btn">
              Dodaj szkolenie
            </Navlink>
          </>
        )}
        <Navlink href="" className="p-btn" onClick={logout}>
          Wyloguj
        </Navlink>
      </div>
    </nav>
  );
};

export default PanelNavbar;
