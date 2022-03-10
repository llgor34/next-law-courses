import Link from 'next/link';
import { useRouter } from 'next/router';

const Navlink = ({ children, href, onClick, className }) => {
  const router = useRouter();

  return (
    <span
      className={`${router.pathname === href ? 'active' : ''} ${className}`}
      onClick={onClick}
    >
      <Link href={href}>{children}</Link>
    </span>
  );
};

export default Navlink;
