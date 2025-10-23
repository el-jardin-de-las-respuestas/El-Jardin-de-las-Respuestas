import { useContext } from "react";
import { ThemeContext } from "../components/shared/ThemeProvider";

export function useTheme() {
  return useContext(ThemeContext);
}
