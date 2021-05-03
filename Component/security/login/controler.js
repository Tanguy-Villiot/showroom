/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */

import {useContext, useState} from "react";
import View from "./view";
import ToastifyContext from "../../toastify/context";
import checkServer from "../../bdd/checkServer";

export default function Login({router}){

    const toastify = useContext(ToastifyContext);



    const [value, setValue] = useState({
        identifiant: "",
        psdw: "",
    })

    const [error, setError] = useState()

    async function handleSubmit() {


        const id = value.identifiant;
        const psdw = value.psdw;

        console.log(id + " / " + psdw)

        const server = checkServer();

        const response = await fetch(`${server}/api/auth/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id, psdw})
        });

        if (response.ok) {
            console.log(response.statusText);

                if(response.statusText === "psdw")
                {
                    toastify.Warning("Wrong password");

                    setError("Wrong password or email address")
                }
                else
                {

                    toastify.Information("Bonjour !");
                    return router.push("/profil");
                }

        } else {
            if (response.status === 404) {
                toastify.Warning("Error");
            }

        }


    }

    async function handleConnectionWithSocial(id) {

        const social = true;

        console.log(id)

        const server = checkServer();

        const response = await fetch(`${server}/api/auth/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id, social})
        });

        if (response.ok) {
            console.log(response.statusText);

            // fetchCurrentUser();

            toastify.Information("Bonjour !");
            return router.push("/profil");
        } else {

                console.log("Email or password wrong");


        }


    }

    function handleChange(evt)
    {

        const val = evt.target.value;
        setValue({
            ...value,
            [evt.target.name]: val
        });

    }

    return(

        <View form={{
            handleSubmit: handleSubmit,
            social: handleConnectionWithSocial,
            value: value,
            error: error,
            handleChange: handleChange
        }}/>

    )


}