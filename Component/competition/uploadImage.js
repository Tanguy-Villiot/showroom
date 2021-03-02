import styles from './uploadImage.module.css';
import {Button, Modal} from "react-bootstrap";
import {useState} from "react";
import firebase from "./controller/competition-utils";


function MyVerticallyCenteredModal(props) {


    const [image, setImage] = useState(null);


    const handleChangeFile = (files) => {

        setImage(files);

        console.log("ouiii");

    }

    const handleClickUpload = () => {


        console.log("upload");

        let bucketName = 'images'
        let file = image[0];
        let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
        let uploadTask = storageRef.put(file);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            ()=>{
                let downloadURL = uploadTask.snapshot.downloadURL
            })
    }


    return (
        <Modal
            {...props}
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
                    <h2 className={styles.title}>Drop file to upload</h2>

                    <div className={styles.dropzone}>

                        <img src="https://100dayscss.com/codepen/upload.svg" alt="Dropzone image"/>

                        <input type="file" className="upload-input" onChange={(e) => handleChangeFile(e.target.files)}/>

                    </div>

                    <button type="button" onClick={handleClickUpload}>Upload file</button>
                </div>
            </Modal.Body>
        </Modal>
    );
}



export default function UploadImage(){

    const [modalShow, setModalShow] = useState(false);


    //Effects Methods
    const handleClickUpload = () =>{
        setModalShow(true);
    }



    return(
        <>
            <Button variant="primary" onClick={handleClickUpload}>Upload Image</Button>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )

}