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

import {useEffect, useState} from "react";
import View from "./view";


export default function Profil({userData}){

    const [userCreation, setUserCreation] = useState({})


    useEffect(() => {


        


    }, [])

    return (
        <View user={userData} userCreation={userCreation}/>

    )

}