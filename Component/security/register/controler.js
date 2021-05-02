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
    })

    const [error, setError] = useState({
        name: "",
        surname: "",
        pseudo: "",
        email: "",
        psdw: "",
    })

    const [passwordCheck, setPasswordCheck] = useState(<span style={{color: "red"}}></span>)


    function fillForm(list)
    {

        const name = list.Name.split(' ');

        setValue({
            name: name[0],
            surname: name[1],
            pseudo: "",
            email: list.email,
            psdw: ""
        });


    }

    /**
     * Give a score to password
     * @param {string} pass Password
     */
    function scorePassword(pass) {
        let score = 0;
        if (!pass)
            return score;

        // award every unique letter until 5 repetitions
        let letters = new Object();
        for (var i=0; i<pass.length; i++) {
            letters[pass[i]] = (letters[pass[i]] || 0) + 1;
            score += 5.0 / letters[pass[i]];
        }

        // bonus points for mixing it up
        let variations = {
            digits: /\d/.test(pass),
            lower: /[a-z]/.test(pass),
            upper: /[A-Z]/.test(pass),
            nonWords: /\W/.test(pass),
        }

        let variationCount = 0;
        for (let check in variations) {
            variationCount += (variations[check] == true) ? 1 : 0;
        }
        score += (variationCount - 1) * 10;

        return parseInt(score);
    }


    /**
     * Change value form
     *
     */
    function handleChange(evt) {



        if(evt.target.name === "psdw")
        {

            if(evt.target.name === "psdw")
            {
                const score = scorePassword(evt.target.value);

                console.log(score)

                if (score > 80) {
                    console.log("ok")
                    setPasswordCheck(<span style={{color: "green"}}>Fort</span>)
                }
                else if (score > 60)
                    setPasswordCheck(<span style={{color: "orange"}}>Moyen</span>)
                else if (score <= 30)
                    setPasswordCheck(<span style={{color: "red"}}>Faible</span>)

            }
        }

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
     * Check string if conforme to patten
     *
     * @param {string} target String to verify
     * @param {Array} pattern List words to ban
     */
    function contains(target, pattern){
        var value = 0;
        pattern.forEach(function(word){
            value = value + target.includes(word);
        });
        return (value === 1)
    }


    /**
     * Submit form
     *
     */
    async function handleSubmit (e) {

        e.preventDefault();

        let validate = true;

        let err = {
            name: "",
            surname: "",
            pseudo: "",
            email: "",
            psdw: "",
        }

        if(value.email === "" || !value.email.includes("@") || !value.email.split("@")[1].includes("."))
        {
            err = {
                ...err,
                email: "Email incorrect"
            };

            validate = false
        }
        else
        {
            const verifyEmail = await checkEmailExist(value.email)

            console.log(verifyEmail)

            if(verifyEmail.find)
            {
                err = {
                    ...err,
                    email: "Email déjà utilisé"
                };

                validate = false            }
        }

        if(value.name === "")
        {

            err = {
                ...err,
                name: "Vous devez remplir votre prénom"
            };

            validate = false
        }

        if(value.surname === "")
        {

            err = {
                ...err,
                surname: "Vous devez remplir votre nom de famille"
            };

            validate = false
        }


        const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        if(value.pseudo === "")
        {
            err = {
                ...err,
                pseudo: "Votre pseudo n'est pas conforme"
            };

            validate = false
        }
        else if(format.test(value.pseudo))
        {
            err = {
                ...err,
                pseudo: "Votre pseudo ne doit pas contenir de caractère spécial"
            };

            validate = false
        }
        else if(value.pseudo.length > 10)
        {
            err = {
                ...err,
                pseudo: "Votre pseudo ne doit pas dépasser 10 caractères"
            };

            validate = false
        }


        if(value.psdw === "" || value.psdw.isEmpty)
        {

            err = {
                ...err,
                psdw: "Vous devez remplir votre mot de passe"
            };

            validate = false
        }
        else if(passwordCheck.props.children === "Faible")
        {
            err = {
                ...err,
                psdw: "Votre mot de passe n'est pas assez fort"
            };

            validate = false
        }


        setError(err)

        console.log(err)

        if(validate)
        {

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

    return(
       <View form={{
           validated: validated,
           handleSubmit: handleSubmit,
           value: value,
           error: error,
           handleChange: handleChange,
           socialFill: fillForm,
           passwordCheck: passwordCheck
       }}/>
    )
}