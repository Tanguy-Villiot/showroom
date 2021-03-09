import '../styles/globals.css';

//Bootstrap Import
import 'bootstrap/dist/css/bootstrap.min.css';

//Component Import
import NavBar from "../Component/navbar";
import Toastify, {ToastifyContext} from "../Component/toastify";
import { PageTransition } from 'next-page-transitions'
import Loader from "../Component/Loader";
import {useEffect, useState} from "react";
import checkUser from "../Component/competition/security/security-utils";


const TIMEOUT = 400

function MyApp({ Component, pageProps, router }) {

    const[user, setUser] = useState({});


    useEffect(() =>{


            checkUser()
                .then(res => {
                    setUser(res);
                })



        },
        [Component],
    );



    return <div className="App">
        <ToastifyContext.Provider value={new Toastify()}>

            <NavBar userData={user}/>


            <PageTransition
                timeout={TIMEOUT}
                classNames="page-transition"
                loadingComponent={<Loader />}
                loadingDelay={500}
                loadingTimeout={{
                    enter: TIMEOUT,
                    exit: 0,
                }}
                loadingClassNames="loading-indicator"
            >

                <Component {...pageProps} key={router.route} />
            </PageTransition>
            <style jsx global>{`
        .page-transition-enter {
          opacity: 0;
          transform: translate3d(0, 20px, 0);
        }
        .page-transition-enter-active {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          transition: opacity ${TIMEOUT}ms, transform ${TIMEOUT}ms;
        }
        .page-transition-exit {
          opacity: 1;
        }
        .page-transition-exit-active {
          opacity: 0;
          transition: opacity ${TIMEOUT}ms;
        }
        .loading-indicator-appear,
        .loading-indicator-enter {
          opacity: 0;
        }
        .loading-indicator-appear-active,
        .loading-indicator-enter-active {
          opacity: 1;
          transition: opacity ${TIMEOUT}ms;
        }
      `}</style>

        </ToastifyContext.Provider>

    </div>
}

export default MyApp
