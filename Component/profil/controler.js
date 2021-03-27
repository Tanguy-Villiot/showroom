/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */

/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */

import {useRouter} from "next/router";
import {useEffect} from "react";
import {useCurrentUser} from "../security/user/userContext";
import View from "./view";


export default function Profil(){

    const router = useRouter()

    const { currentUser, fetchCurrentUser } = useCurrentUser();

    useEffect(() => {
        fetchCurrentUser()

        console.log("render")

    }, [])


    return (
        <>
            {typeof(currentUser) == "undefined" ?

                <span>Loading...</span>

                :

                currentUser.connected === false ?

                    () => router.push("/")

                    :

                    <View user={currentUser.user} />







            }


        </>

    )

}