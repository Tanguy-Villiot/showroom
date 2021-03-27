/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */
import {useContext} from "react";
import ToastifyContext from "../toastify/context";

export default function Page(props)
{

    const toastify = useContext(ToastifyContext);

    function Test(message){


        toastify.Success(message);


    }


    return(
        <>
            {props.children}
        </>
    )
}