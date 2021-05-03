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

        var res = response.profileObj;


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

                        <Formulaire form={form}/>

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


                            <Button variant="primary button_form" style={{marginLeft: "2em"}} onClick={form.handleSubmit}>Créer un compte</Button>
                        </>


                        :

                        <Button variant="primary button_form" onClick={form.handleSubmit}>Créer un compte</Button>

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

                <form autoComplete="off">

                    <label htmlFor="defaultFormLoginEmailEx" className="grey-text label">
                        Email Address
                    </label>
                    <input className="form-control input"
                           type="email"
                           name="email"
                           pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}"
                           value={form.value.email}
                           onChange={form.handleChange}
                           required

                    />
                    <span className={styles.error}>{form.error.email}</span>
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
                    <span className={styles.error}>{form.error.name}</span>
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
                    <span className={styles.error}>{form.error.surname}</span>
                    <br />

                    <div className={styles.pseudo}>
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
                        <div className={styles.pseudoInfo}>
                            <p>- Ne doit pas dépasser 10 caractères</p>
                            <p style={{marginBottom: "0em"}}>- Ne doit pas contenir de caractère spécial</p>
                        </div>
                        <span className={styles.error}>{form.error.pseudo}</span>
                    </div>

                    <div className={styles.password}>
                        <Form.Label className="label">Password</Form.Label>
                        <Form.Control
                            className="input"
                            required
                            type="password"
                            name="psdw"
                            placeholder=""
                            value={form.value.psdw}
                            onChange={form.handleChange}
                        />
                        <div className={styles.passwordCheck}>{form.passwordCheck}</div>
                        <span className={styles.error}>{form.error.psdw}</span>

                    </div>



                    <div className="custom-control custom-checkbox check">
                        <input type="checkbox" className="custom-control-input" id="defaultChecked2" />
                        <label className="custom-control-label" htmlFor="defaultChecked2">Default checked</label>
                    </div>

                </form>


            </div>

        </>

    )


}

function FormulaireSocial({form})
{
    return(


        <>

            <div className={styles.item}>


                <form autoComplete="off">

                    <label htmlFor="defaultFormLoginEmailEx" className="grey-text label">
                        Email Address
                    </label>
                    <input className="form-control input"
                           type="email"
                           name="email"
                           pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}"
                           value={form.value.email}
                           onChange={form.handleChange}
                           required

                    />
                    <span className={styles.error}>{form.error.email}</span>
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
                    <span className={styles.error}>{form.error.name}</span>
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
                    <span className={styles.error}>{form.error.surname}</span>
                    <br />

                    <div className={styles.pseudo}>
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
                        <div className={styles.pseudoInfo}>
                            <p>- Ne doit pas dépasser 10 caractères</p>
                            <p style={{marginBottom: "0em"}}>- Ne doit pas contenir de caractère spécial</p>
                        </div>
                        <span className={styles.error}>{form.error.pseudo}</span>
                    </div>

                    <div className={styles.password}>
                        <Form.Label className="label">Password</Form.Label>
                        <Form.Control
                            className="input"
                            required
                            type="password"
                            name="psdw"
                            placeholder=""
                            value={form.value.psdw}
                            onChange={form.handleChange}
                        />
                        <div className={styles.passwordCheck}>{form.passwordCheck}</div>
                        <span className={styles.error}>{form.error.psdw}</span>

                    </div>



                    <div className="custom-control custom-checkbox check">
                        <input type="checkbox" className="custom-control-input" id="defaultChecked2" />
                        <label className="custom-control-label" htmlFor="defaultChecked2">Default checked</label>
                    </div>

                </form>


            </div>

        </>


    )
}
