/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */
import styles from './header.module.css'
import {useRouter} from "next/router";
import {useEffect} from "react";
import {useCurrentUser} from "../../security/user/userContext";

export default function Header({changePage}){

    const router = useRouter();
    const { currentUser, fetchCurrentUser } = useCurrentUser();


    function returnToSite()
    {
        router.push('/')
    }

    useEffect(() => fetchCurrentUser(), [router.pathname])

    return(
        <div className={styles.header}>

            <img className={styles.return} src="/app/return.svg" alt="return" onClick={returnToSite}/>
            <img className={styles.logo} src="/homepage/logo-acceuil.png" alt="logo" />

            {!currentUser.connected ?
                <img className={styles.profile} src="/app/profile.svg" alt="logo" onClick={() => router.push("/app/signin")}/>
            :
                <div className={styles.userContainer}>
                    <h3 className={styles.name}>{currentUser.user.name}</h3>
                    <img className={styles.profile} src="/app/profile.svg" alt="logo" onClick={() => router.push("/app/profile")}/>

                </div>

            }


        </div>
    )

}
