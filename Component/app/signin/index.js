/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */

import {useContext, useState} from "react";
import ToastifyContext from "../../toastify/context";
import checkServer from "../../bdd/checkServer";
import View from "./view";
import {useRouter} from "next/router";
import {useCurrentUser} from "../../security/user/userContext";

export default function SignIn(){

    const toastify = useContext(ToastifyContext);
    const router = useRouter()
    const { fetchCurrentUser } = useCurrentUser();


    const [value, setValue] = useState({
        identifiant: "",
        psdw: "",
    })

    const [error, setError] = useState()


    /**
     * When click on submit button
     *
     */
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
                fetchCurrentUser()
                    .then(() => {
                        toastify.Information("Bonjour !");
                        return router.push("/app/profile");
                    });

            }

        } else {
            if (response.status === 404) {
                toastify.Warning("Error");
            }

        }


    }

    /**
     * When click on connection google or facebook button
     *
     * @param {string} id Mail of user.
     */
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

            fetchCurrentUser()
                .then(() => {
                    toastify.Information("Bonjour !");
                    return router.push("/app/profile");
                })

        } else {

            console.log("Email or password wrong");


        }


    }

    /**
     * Change value when form change
     *
     * @param {string} evt Value of field.
     */
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