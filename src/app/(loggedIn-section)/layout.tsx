import Footer from '../components/Footer';
import LoggedInHeader from '../components/LoggedInHeaderParts/LoggedInHeader';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoggedInHeader />
      {children}
    </>
  );
}
