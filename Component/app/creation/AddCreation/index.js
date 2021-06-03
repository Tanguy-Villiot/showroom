/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */
import global from '../../app.module.css'
import styles from "./addCreation.module.css"

import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {Button, Form} from "react-bootstrap";
import {useState} from "react";

export default function AddCreation({image, handleReturnToHomePage}){

    const [valueForm, setValueForm] = useState({
        title: "",
        description: ""
    })


    /**
     * Change the value state of form
     *
     */
    function handleChangeForm(evt) {
        const val = evt.target.value;
        setValueForm({
            ...valueForm,
            [evt.target.name]: val
        });

    }


    /**
     * Submit the creation
     *
     */
    function handleSubmit(){


    }

    /**
     * Cancel add creation and return to homepage
     *
     */
    function handleClose(){

        handleReturnToHomePage();

    }


    return(
        <div className={global.page}>

            <img className={styles.close} src="/app/cancel.svg" alt="close" onClick={(handleClose)}/>


            <div className={styles.container}>

                <div className={styles.item}>
                    <img className={styles.image} src={image.url} alt="Image" />
                </div>

                <div className={styles.itemInfos}>

                    <MDBContainer className="mt-5">
                        <MDBRow>
                            <MDBCol className="m-auto">
                                <Form onSubmit={handleSubmit}>
                                    <div className={styles.titleContainer}>
                                        <p className={styles.Title}>Veuillez à bien remplir toutes les informations avant d'envoyer votre création !</p>
                                    </div>

                                    <MDBRow>
                                        <MDBCol>
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                name="title"
                                                placeholder="Ma belle carotte"
                                                value={valueForm.title}
                                                onChange={handleChangeForm}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">
                                                Please enter a title.
                                            </Form.Control.Feedback>
                                            <br />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol>
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                required
                                                as="textarea"
                                                name="description"
                                                value={valueForm.description}
                                                onChange={handleChangeForm}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">
                                                Please enter a description.
                                            </Form.Control.Feedback>
                                            <br />
                                        </MDBCol>

                                    </MDBRow>


                                    <Form.Group>
                                        <span className="text-muted">By pressing the "Submit" button, you accept the CGP</span>
                                    </Form.Group>

                                    <div className="text-center mt-4">
                                        <Button type="submit">Send creation</Button>
                                    </div>
                                </Form>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>

                </div>

            </div>



        </div>
    )

}
