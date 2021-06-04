/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */
import styles from "./profile.module.css"
import {useRouter} from "next/router";
import {Button} from "react-bootstrap";
import {useContext, useState} from "react";
import ToastifyContext from "../../toastify/context";
import {useCurrentUser} from "../../security/user/userContext";
import Informations from "./information";
import Participation from "./participation";


export default function Profile(){

    const toastify = useContext(ToastifyContext);
    const router = useRouter()
    const { currentUser } = useCurrentUser();

    const [content, setContent] = useState("home")

    // API FUNCTION

    /**
     * Logout user
     *
     */
    async function handleLogout(){

        const response = await fetch("../api/auth/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {

            toastify.Information("You have been logout");
            return router.push("/app");
        }
    }


    /**
     * Render the good view
     *
     */
    function RenderContent()
    {
        switch (content)
        {
            case "home":
                return <Home />
            case "infos":
                return <Informations />
            case "participation":
                return <Participation />
            default:
                return <Home />
        }
    }

    function Home()
    {
        return (
            <div className={styles.home + " container"}>

                <h1 className={styles.home_contest}>Participation au concours du mois </h1>

                <div className={styles.progessBar}>

                    <div className={styles.step} style={{backgroundColor: "#EBAA5D"}}>

                        <p className={styles.stepText}>Participation envoyé</p>

                    </div>

                    <div className={styles.step} style={{backgroundColor: "#E88227"}}>

                        <p className={styles.stepText}>Création validée par D-Note</p>

                    </div>

                    <div className={styles.step} style={{backgroundColor: "#DD2D2D"}}>

                        <p className={styles.stepText}>Vote effectué</p>

                    </div>

                </div>

                <div className={styles.cases}>

                    <div className={styles.casesitem}>

                        <img className={styles.casesitem_icon} src="/app/profile/userIcon.png" alt="user icon "/>

                        <p className={styles.casesitem_text}>Mes infos</p>

                    </div>

                    <div className={styles.casesitem}>

                        <img className={styles.casesitem_icon} src="/app/profile/medal.png" alt="user icon "/>

                        <p className={styles.casesitem_text}>Mes participations</p>

                    </div>

                    <div className={styles.casesitem}>

                        <img className={styles.casesitem_icon} src="/app/profile/stats.png" alt="user icon "/>

                        <p className={styles.casesitem_text}>Mes statistiques</p>

                    </div>

                    <div className={styles.casesitem}>

                        <img className={styles.casesitem_icon} src="/app/profile/feedback.png" alt="user icon "/>

                        <p className={styles.casesitem_text}>Feedback</p>

                    </div>


                </div>


            </div>

        )
    }

    return(
        <div className={styles.profile}>

            <div className={styles.header}>

                <div className={styles.navbar}>

                    <img className={styles.return} src="/app/return.svg" alt="return" onClick={() => router.push("/app")}/>

                    <Button className={styles.deco} variant="danger" onClick={() => handleLogout()}>Déconnexion</Button>
                </div>


                <div className={styles.user}>

                    <img className={styles.userPicture} src="/app/profile.svg" alt="return"/>

                    <h3 className={styles.userName}>{currentUser.user.name} {currentUser.user.surname}</h3>


                </div>

            </div>

            <div className={styles.content}>

                <RenderContent />

            </div>

        </div>
    )

}
