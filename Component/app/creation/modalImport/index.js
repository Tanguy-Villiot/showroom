/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */

import styles from "./modalImport.module.css";
import {useContext, useEffect, useState} from "react";
import {useCurrentUser} from "../../../security/user/userContext";
import CompetitionContext from "../../../competition/competitionContext";
import {getCreationByCompetition} from "../../../bdd/user/dataUser";
import checkServer from "../../../bdd/checkServer";
import checkUser from "../../../competition/security/security-utils";
import {removeCreation} from "../../../bdd/creation/actionCreation";
import {Button, Form, Modal, ProgressBar} from "react-bootstrap";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";

export default function ModalImport({competition, toastify, fileImport}){

    const {currentUser} = useCurrentUser();


    const [uploadModalShow, setUploadModalShow] = useState(false);


    /**
     * Open modal upload
     */
    const handleClickUpload = async () => {

        if(!currentUser.connected)
        {
            toastify.Warning("You must be log-in to participate !")
        }
        else
        {
            setUploadModalShow(true);
        }


    }



    return(
        <>
            <div className={styles.contestButtonParticiper} onClick={handleClickUpload}>

                <img className={styles.contestButtonParticiperImg} src="/app/upload.png" alt="panneaux" />

                <p className={styles.contestButtonParticiperText}>Upload votre création</p>
            </div>



            <ModalUpload
                show={uploadModalShow}
                onHide={() => setUploadModalShow(false)}
                toastify={toastify}
                competition={competition}
                fileImport={(Image) => fileImport(Image)}
            />
        </>
    )
}


function ModalUpload(props) {

    const [image, setImage] = useState(null);
    const [percent, setPercent] = useState(0);
    const [imageUrl, setImageUrl] = useState(undefined);
    const [validatedForm, setValidatedForm] = useState(false);

    const [valueForm, setValueForm] = useState({
        title: "",
        description: ""
    })

    const [showAlertExist, setShowAlertExist] = useState(false);

    const {currentUser} = useCurrentUser();

    const {competition} = useContext(CompetitionContext)




    //Effects methods
    useEffect(() => {}, [percent],);


    /**
     * hide modal and reset state
     */
    function handleHide(){

        setImage(null)
        setPercent(0)
        setImageUrl(undefined)
        setValidatedForm(false)
        setValueForm({
            title: "",
            description: ""
        })

        props.onHide();

    }

    /**
     * Change image in image state
     *
     * @param {files} files in input file.
     */
    const handleChangeFile = (files) => {

        setImage(files);

        setImageUrl(URL.createObjectURL(files[0]));

        const Image = {
            file: files,
            url: URL.createObjectURL(files[0])
        }

        props.fileImport(Image);


        // console.log(files)
        //
        // console.log("ouiii");

    }

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
     * On click button Submit form
     *
     */
    async function handleSubmit(e) {

        e.preventDefault()

        console.log(e.currentTarget)

        const form = e.currentTarget;


        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();

        } else {


            setValidatedForm(true)

            const creationExist = await getCreationByCompetition(currentUser.user.id, competition._id);

            if(creationExist.find !== false)
            {
                setShowAlertExist(true)
            }
            else
            {
                uploadImage()

            }

        }

    }

    /**
     * On click override on Alert Modal
     *
     */
    async function handleClickOverride(e) {

        console.log(currentUser.user.id + " / " + props.competition._id)

        await RemoveCreationToBdd()

    }


    //API METHODS
    /**
     * Upload image to firebase
     *
     */
    const uploadImage = () => {

        let bucketName = 'images'
        let file = image[0];
        let storageRef = firebase.storage().ref(`${bucketName}/${currentUser.user.id}_${props.competition._id}`);
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
        const user = await checkUser();

        const userId = user.user.id;

        const res = await fetch(`${server}/api/creation/addCreation`, {

            method: 'post',

            body:JSON.stringify({ url, userId, valueForm })

        })

        if(res.statusText === "OK")
        {
            props.toastify.Success("Your creation has been sent !");
            handleHide();
        }
        else
        {
            props.toastify.Warning("Error : Your creation has not been sent !");
        }



    }

    /**
     * Remove creation value and url image in bdd
     *
     */
    const RemoveCreationToBdd = async() =>{


        const server = checkServer();

        removeCreation(currentUser.user.id, props.competition._id)
            .then(res => {

                console.log(res)

                if(res.success)
                {
                    uploadImage()
                    setShowAlertExist(false);
                }

            })


    }


    return (
        <>
            <Modal show={showAlertExist} onHide={() => setShowAlertExist(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>You have already upload creation</Modal.Title>
                </Modal.Header>
                <Modal.Body>if you continue, your last creation will be remove !</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowAlertExist(false)}>
                        Undo
                    </Button>
                    <Button variant="success" onClick={handleClickOverride}>
                        Override
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={props.show}
                onHide={handleHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Send your image
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.frame}>

                        {typeof (imageUrl) === "undefined" ?

                            <>
                                <h2 className={styles.title}>Drop file or click to import your creation</h2>

                                <div className={styles.dropzone}>

                                    <img src="https://100dayscss.com/codepen/upload.svg" alt="Dropzone image"/>

                                    <input type="file" className="upload-input"
                                           onChange={(e) => handleChangeFile(e.target.files)}/>


                                </div>
                            </>

                            :

                            <>
                                <img src={imageUrl} className={styles.images} alt="Dropzone image"/>

                                <MDBContainer className="mt-5">
                                    <MDBRow>
                                        <MDBCol className="m-auto">
                                            <Form noValidate validated={validatedForm} onSubmit={handleSubmit}>
                                                <p className="h4 mb-4">Informations</p>

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

                                <ProgressBar className={styles.progressBar} now={percent} label={`${percent}%`}/>


                            </>

                        }




                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
