import {
  CssBaseline,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
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
      <Header />
      <Splash />
      <Footer />
    </MuiThemeProvider>
  );
}

export default App;
