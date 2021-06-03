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

import styles from "../../security/register/register.module.css";

import style from "./signin.module.css"

import Link from "next/link";
import GoogleLogin from "react-google-login";
import {Button, Form, Navbar} from "react-bootstrap";

export default function View({form})
{

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

        form.social(googleresponse.email);


        // form.socialFill(googleresponse)

    }

    return (
        <>
            <div className={styles.navtop}>
                <Link href="/app">
                    <div className={styles.navbar}>
                        <img className={styles.return} src="/app/return.svg" alt="return"/>
                        <img src="/homepage/logo-acceuil.png" className={styles.logo} alt="Logo"/>
                    </div>
                </Link>

            </div>


            <div className={style.container}>

                <div className={style.item + " " + style.Itemleft}>



                </div>

                <div className={style.item + " container"}>

                    <h1 className={styles.title}>Se connecter</h1>




                        <div className={style.buttonGoogle}>
                            <GoogleLogin
                                clientId="794543572273-7fq2jtijopggmra1ijvv9lr3lp827nh4.apps.googleusercontent.com"
                                buttonText="GOOGLE"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                className={style.GoogleButton}
                            />
                        </div>


                    <div className={style.Also}>

                        <div className={style.AlsoBar}></div>

                        <span className={style.AlsoText}>Ou</span>

                    </div>





                        <div className={style.content}>

                            <form autoComplete="off">

                                <div className={style.input}>
                                    <label htmlFor="defaultFormLoginEmailEx" className="grey-text label">
                                        Email Address
                                    </label>
                                    <input className={" form-control input"}
                                           type="email"
                                           name="identifiant"
                                           pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}"
                                           value={form.value.identifiant}
                                           onChange={form.handleChange}
                                           required

                                    />
                                    {/*<span className={styles.error}>{form.error.email}</span>*/}
                                    <br/>
                                </div>

                                <div className={style.input}>
                                    <Form.Label className="label">Password</Form.Label>
                                    <Form.Control
                                        className={style.input + " input"}
                                        required
                                        type="password"
                                        name="psdw"
                                        value={form.value.psdw}
                                        onChange={form.handleChange}
                                    />
                                    <span className={styles.error}>{form.error}</span>
                                    <br />
                                </div>



                            </form>


                        </div>


                    <div className={styles.buttons}>




                        <Button variant="primary button_form" style={{marginLeft: "2em"}} onClick={form.handleSubmit}>Connexion</Button>


                    </div>

                    <div className={style.signup}>
                        <span>Vous n'avez pas encore de compte ? <Link href="/register"><a href="/register">Inscrivez-vous maintenant</a></Link></span>
                    </div>


                </div>




            </div>


        </>
    )


}
