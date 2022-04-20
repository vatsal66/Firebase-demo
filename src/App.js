import './App.css';
import { Router, Link } from "@reach/router";
import Home from './Home';
import Theme from './ThemeDemo';
import Facebook from './Facebook';


function App() {

  return (
    <Router>
      <Home path="/" />
      <Theme path="dark-theme" />
      <Facebook path="facebook-login" />
    </Router>
  );
}

export default App;