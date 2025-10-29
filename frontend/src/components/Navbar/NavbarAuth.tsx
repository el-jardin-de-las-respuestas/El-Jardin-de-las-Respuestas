const NavbarAuth = () => {
  return (
    <nav style={{ padding: '1rem', background: '#333', color: 'white' }}>
      <h2>Navbar Autenticado</h2>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
        <li><a href="/" style={{ color: 'white' }}>Inicio</a></li>
        <li><a href="/about" style={{ color: 'white' }}>Acerca de</a></li>
        <li><a href="/edit-profile" style={{ color: 'white' }}>Editar Perfil</a></li>
        <li><button style={{ color: 'white', background: 'red' }}>Cerrar Sesión</button></li>
      </ul>
    </nav>
  );
};

export default NavbarAuth;