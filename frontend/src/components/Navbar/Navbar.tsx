import { useAuth } from "../../hooks/useAuth"; 
import NavbarPublic from "./NavbarPublic";
import NavbarAuth from "./NavbarAuth";

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <NavbarAuth /> : <NavbarPublic />;
};

export default Navbar;