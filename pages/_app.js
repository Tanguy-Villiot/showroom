import '../styles/globals.css';

//Bootstrap Import
import 'bootstrap/dist/css/bootstrap.min.css';

//Component Import
import NavBar from "../Component/navbar";


function MyApp({ Component, pageProps }) {
  return <div className="App">
      <NavBar/>
    <Component {...pageProps} />
  </div>
}

export default MyApp
