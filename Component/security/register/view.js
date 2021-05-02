/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */

import styles from "./register.module.css";

import {MDBCol, MDBRow} from "mdbreact";
import {Button, Form, InputGroup, Nav} from "react-bootstrap";

import GoogleLogin from 'react-google-login';

import Link from "next/link";
import {useState} from "react";

export default function View({form}) {

    const [state, setState] = useState(0)


    const responseGoogle = (response) => {

        // console.log(response);

        var res = response.profileObj;

        // console.log(res);

        // signup(response);

        getInfoSocial(response)

    }


    function getInfoSocial(res) {

        const googleresponse = {

            Name: res.profileObj.name,

            email: res.profileObj.email,

            token: res.googleId,

            Image: res.profileObj.imageUrl,

            ProviderId: 'Google'

        };


        form.socialFill(googleresponse)

        setState(1)
    }

    function SubmitForm() {


    }

    return (
        <>
            <div className={styles.navtop}>
                <Link href="/"><img src="homepage/logo-acceuil.png" className={styles.logo} alt="Logo"/></Link>

            </div>


            <div className={styles.container + " container"}>


                {state === 0 ?

                    <h1 className={styles.title}>Créer un compte</h1>

                    :

                    <>
                        <h1 className={styles.title}>Bienvenue <span
                            style={{color: "#007bff"}}> {form.value.name}</span> !</h1>

                        <h3 className={styles.subtitle}>Vérifier vos informations, choissisez un pseudo et un mot de
                            passe et confirmer votre inscription.</h3>
                    </>


                }


                <div className={styles.content}>


                    {state === 0 ?

                        <Formulaire form={form} social={getInfoSocial}/>

                        :

                        <FormulaireSocial form={form}/>

                    }


                </div>

                <div className={styles.buttons}>

                    {state === 0 ?

                        <>
                            <GoogleLogin
                                clientId="794543572273-7fq2jtijopggmra1ijvv9lr3lp827nh4.apps.googleusercontent.com"
                                buttonText="S'inscrire avec Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                className={styles.GoogleButton}/>


                            <Button variant="primary button_form" style={{marginLeft: "2em"}}>Créer un compte</Button>
                        </>


                        :

                        <Button variant="primary button_form">Créer un compte</Button>

                    }


                </div>

                <div className={styles.connection}>

                    <h2 className={styles.connection_title}>Ou</h2>

                    <Button variant="primary button_form_variant">Connexion</Button>


                </div>

            </div>


        </>
    )

}

function Formulaire({form}){


    return (

        <>

            <div className={styles.item}>

                <img className={styles.image} src="/register/placeholder.png" alt="placeholder" />


            </div>


            <div className={styles.bar}></div>


            <div className={styles.item}>


                <label htmlFor="defaultFormLoginEmailEx" className="grey-text label">
                    Your email
                </label>
                <input className="form-control input"
                       type="email"
                       name="email"
                       pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}"
                       value={form.value.email}
                       onChange={form.handleChange}
                       required



                />
                <br/>

                <Form.Label className="label">First name</Form.Label>
                <Form.Control
                    className="input"
                    required
                    type="text"
                    name="name"
                    value={form.value.name}
                    onChange={form.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <br />

                <Form.Label className="label">Last name</Form.Label>
                <Form.Control
                    className="input"
                    required
                    type="text"
                    name="surname"
                    value={form.value.surname}
                    onChange={form.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <br />

                <Form.Label className="label">Pseudo</Form.Label>
                <Form.Control
                    className="input"
                    required
                    type="text"
                    autoComplete="nope"
                    name="pseudo"
                    value={form.value.pseudo}
                    onChange={form.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <br />
                <Form.Label className="label">Password</Form.Label>
                <Form.Control
                    className="input"
                    required
                    type="password"
                    name="psdw"
                    value={form.value.psdw}
                    onChange={form.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <br />


                <div className="custom-control custom-checkbox check">
                    <input type="checkbox" className="custom-control-input" id="defaultChecked2" />
                        <label className="custom-control-label" htmlFor="defaultChecked2">Default checked</label>
                </div>


            </div>

        </>

    )


}

function FormulaireSocial({form})
{
    return(


        <>

            <div className={styles.item}>


                <label htmlFor="defaultFormLoginEmailEx" className="grey-text label">
                    Your email
                </label>
                <input className="form-control input"
                       type="email"
                       name="email"
                       value={form.value.email}
                       onChange={form.handleChange}
                       required
                />
                <br/>

                <Form.Label className="label">First name</Form.Label>
                <Form.Control
                    className="input"
                    required
                    type="text"
                    name="name"
                    value={form.value.name}
                    onChange={form.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <br />

                <Form.Label className="label">Last name</Form.Label>
                <Form.Control
                    className="input"
                    required
                    type="text"
                    name="surname"
                    value={form.value.surname}
                    onChange={form.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <br />

                <Form.Label className="label">Pseudo</Form.Label>
                <Form.Control
                    className="input"
                    required
                    type="text"
                    autoComplete="nope"
                    name="pseudo"
                    value={form.value.pseudo}
                    onChange={form.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <br />
                <Form.Label className="label">Password</Form.Label>
                <Form.Control
                    className="input"
                    required
                    type="password"
                    name="psdw"
                    value={form.value.psdw}
                    onChange={form.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <br />


                <div className="custom-control custom-checkbox check">
                    <input type="checkbox" className="custom-control-input" id="defaultChecked2" />
                    <label className="custom-control-label" htmlFor="defaultChecked2">Default checked</label>
                </div>


            </div>

        </>


    )
}
