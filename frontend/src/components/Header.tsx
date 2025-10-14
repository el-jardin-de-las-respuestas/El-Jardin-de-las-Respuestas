import { AppBar, Toolbar, Button } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static" className="bg-blue-600 shadow-md">
      <Toolbar className="flex justify-between">
        <h1 className="text-white font-bold">Mi App</h1>
        <div>
          <Button color="inherit">Login</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
