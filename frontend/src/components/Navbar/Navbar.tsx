// src/components/Navbar/Navbar.tsx
import { useAuth } from "hooks/useAuth.ts";
import NavbarPublic from "./NavbarPublic";
import NavbarAuth from "./NavbarAuth";

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <NavbarAuth /> : <NavbarPublic />;
};

export default Navbar;