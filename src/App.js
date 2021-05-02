import {
  CssBaseline,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core';
import Splash from './pages/Splash';

const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#081229"
    }
  }
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Splash />
    </MuiThemeProvider>
  );
}

export default App;
