import "./App.css";

// theme imports
import { ThemeProvider } from "@mui/material";
import * as theme from "./theme/main";

// cached provider and imports
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
const muiCache = createCache({
  key: "mui",
  prepend: true,
});

// import for routing
import AppRoutes from "./routes";

function App() {
  return (
    <CacheProvider value={muiCache}>
      {/* this is for caching all the thing before DOM load */}
      <>
        {/* It make the cable to change theme as the system changes */}
        <ThemeProvider
          theme={theme.isDarkTheme() ? theme.darkTheme : theme.lightTheme}
        >
          {/* Routing start*/}
          <AppRoutes />
          {/* Routing end */}
        </ThemeProvider>
      </>
    </CacheProvider>
  );
}

export default App;
