import '../styles/globals.css';

//Bootstrap Import
import 'bootstrap/dist/css/bootstrap.min.css';

//Component Import
import NavBar from "../Component/navbar";

//Context Import
import Toastify, {ToastifyContext} from "../Component/toastify";
import { CurrentUserProvider } from "../Component/security/user/userContext";
import CompetitionContext from "../Component/competition/competitionContext"
import {useEffect, useState} from "react";


//Api Import
import {getActualCompetition} from "../Component/bdd/competition/dataCompetition"


const TIMEOUT = 400

function MyApp({ Component, pageProps, router}) {

    const [competition, setCompetition] = useState(null)


    useEffect(() => {

        getActualCompetition()
            .then(res => {
                setCompetition(res[0])
            })

    }, [])


    return <div className="App">
        <CurrentUserProvider>
            <ToastifyContext.Provider value={new Toastify()}>
                <CompetitionContext.Provider value={{ competition: competition }}>


                        {!competition ?
                            <h1>Loading...</h1>
                        :
                            <>
                                <NavBar/>
                                <Component {...pageProps} key={router.route}/>
                            </>

                        }


                </CompetitionContext.Provider>

            </ToastifyContext.Provider>

        </CurrentUserProvider>

    </div>
}

export default MyApp

