// src/components/Navbar/NavbarPublic.tsx
const NavbarPublic = () => {
  return (
    <nav style={{ padding: '1rem', background: '#333', color: 'white' }}>
      <h2>Navbar Público</h2>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
        <li><a href="/" style={{ color: 'white' }}>Inicio</a></li>
        <li><a href="/about" style={{ color: 'white' }}>Acerca de</a></li>
        <li><a href="/login" style={{ color: 'white' }}>Login</a></li>
      </ul>
    </nav>
  );
};

export default NavbarPublic;