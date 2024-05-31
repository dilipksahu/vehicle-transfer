import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;
