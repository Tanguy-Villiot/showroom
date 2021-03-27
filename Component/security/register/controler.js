/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */

import {useContext, useState} from "react";
import ToastifyContext from "../../toastify/context";
import View from "./view";
import checkServer from "../../bdd/checkServer";

export default function Register({router}){

    //GLOBAL PARAMS
    const toastify = useContext(ToastifyContext);
    const server = checkServer();


    /********* FORM ***********/
    const [validated, setValidated] = useState(false);

    const [value, setValue] = useState({
        name: "",
        surname: "",
        pseudo: "",
        email: "",
        psdw: "",
        confirmpswd: ""
    })


    /**
     * Change value form
     *
     */
    function handleChange(evt) {
        const val = evt.target.value;
        setValue({
            ...value,
            [evt.target.name]: val
        });

    }

    /**
     * Check if email exist on BDD
     *
     * @param {string} email Email to verify
     */
    async function checkEmailExist(email) {

        const res = await fetch(`${server}/api/auth/checkEmailExist`, {

            method: 'post',

            body: JSON.stringify({email})

        })

        return res.json()
    }


    /**
     * Submit form
     *
     */
    async function handleSubmit (e) {

        e.preventDefault();


        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();

            console.log("ok")

        }
        else
        {
            setValidated(true);

            if(value.psdw === value.confirmpswd)
            {
                const verifyEmail = await checkEmailExist(value.email)

                console.log(verifyEmail)

                if(verifyEmail.find)
                {
                    toastify.Warning("an account has already been created with email " + value.email);
                }
                else
                {
                    console.log(value);

                    const res = await fetch('http://localhost:3000/api/auth/register', {

                        method: 'post',

                        body:JSON.stringify({ value })

                    })

                    if (res.ok) {
                        console.log(res.status);

                        const email = value.email;
                        const password = value.psdw;


                        const response = await fetch("../api/auth/login", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ email, password })
                        });

                        if (response.ok) {
                            console.log(response.status);


                            toastify.Information(`Bonjour ${value.name}!`);

                            return router.push("/profil");

                        }


                    }
                }


            }
            else
            {
                toastify.Warning("Passwords do not match");

            }




        }


        setValidated(true);



    }

    return(
       <View form={{
           validated: validated,
           handleSubmit: handleSubmit,
           value: value,
           handleChange: handleChange
       }}/>
    )
}