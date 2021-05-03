/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */

import {useRouter} from "next/router";
import Login from "../../Component/security/login/controler";

export default function Index(){

    const router = useRouter();

    return <Login router={router}/>

}