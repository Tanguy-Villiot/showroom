/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */
import global from '../../app.module.css'
import styles from "./addCreation.module.css"

import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {Button, Form} from "react-bootstrap";
import {useContext, useState} from "react";
import {initFirebase} from "../../../firebase/firebase-utils";
import checkServer from "../../../bdd/checkServer";
import {useCurrentUser} from "../../../security/user/userContext";
import CompetitionContext from "../../../competition/competitionContext";

let firebase = initFirebase();

export default function AddCreation({image, handleReturnToHomePage}){

    const [valueForm, setValueForm] = useState({
        title: "",
        description: ""
    })

    const { currentUser } = useCurrentUser();
    const {competition} = useContext(CompetitionContext)




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
    async function handleSubmit(e) {

        e.preventDefault()

        console.log(e.currentTarget)



        // const creationExist = await getCreationByCompetition(currentUser.user.id, competition._id);

        // if(creationExist.find !== false)
        // {
        //     setShowAlertExist(true)
        // }
        // else
        // {
            uploadImage()

        // }


    }

    const uploadImage = () => {

        let bucketName = 'images'
        let file = image[0];
        let storageRef = firebase.storage().ref(`${bucketName}/${currentUser.user.id}_${competition._id}`);
        let uploadTask = storageRef.put(file);
        uploadTask.on('state_changed',
            (snapshot) => {



                var progress = Math.round(((snapshot.bytesTransferred / snapshot.totalBytes) * 100) * 10) / 10;
                setPercent(progress);
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }

            }, (err) => {
                //catches the errors
                console.log(err)
            }, () => {
                // gets the functions from storage refences the image storage in firebase by the children
                // gets the download url then sets the image from firebase as the value for the imgUrl key:
                storageRef.getDownloadURL()
                    .then(fireBaseUrl => {

                        AddcreationToBdd(fireBaseUrl);

                    })
            })
    }

    /**
     * Add creation value and url image in bdd
     *
     * @param {string} url Url of image
     */
    const AddcreationToBdd = async(url) =>{


        const server = checkServer();

        const userId = currentUser.user.id;

        const res = await fetch(`${server}/api/creation/addCreation`, {

            method: 'post',

            body:JSON.stringify({ url, userId, valueForm })

        })

        if(res.statusText === "OK")
        {
            props.toastify.Success("Your creation has been sent !");
        }
        else
        {
            props.toastify.Warning("Error : Your creation has not been sent !");
        }



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
