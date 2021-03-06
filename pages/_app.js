import '../styles/globals.css';

//Bootstrap Import
import 'bootstrap/dist/css/bootstrap.min.css';

//Component Import
import NavBar from "../Component/navbar";
import Toastify, {ToastifyContext} from "../Component/toastify";


function MyApp({ Component, pageProps }) {
    return <div className="App">
        <ToastifyContext.Provider value={new Toastify()}>
            <NavBar/>
            <Component {...pageProps} />
        </ToastifyContext.Provider>

    </div>
}

export default MyApp
