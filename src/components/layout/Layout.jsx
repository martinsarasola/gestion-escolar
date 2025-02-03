import { Outlet } from "react-router-dom";
import MiniDrawer from "./MiniDrawer";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import "@fontsource/source-serif-pro";
import theme from "../../theme/theme";

function Layout() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <MiniDrawer></MiniDrawer>
        <Box
          sx={{
            display: "flex",
            width: "100vw",
            maxWidth: "100%",
            paddingTop: { xs: "50px", sm: "87px" },
            paddingLeft: { xs: "61px", sm: "98px" },
            paddingRight: { xs: "0px", sm: "35px" },
            paddingBottom: "21px",
            border: "0px solid black",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Layout;
