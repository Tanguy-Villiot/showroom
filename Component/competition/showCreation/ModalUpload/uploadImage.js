import styles from './uploadImage.module.css';
import {Button, Modal, ProgressBar} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import checkUser from "../../security/security-utils";
import ToastifyContext from "../../../toastify/context";
import {initFirebase} from "../../../firebase/firebase-utils";
import {getCreationByCompetition} from "../../../bdd/user/dataUser";

let firebase = initFirebase();


function MyVerticallyCenteredModal(props) {


    const [image, setImage] = useState(null);
    const [percent, setPercent] = useState(0);


    useEffect(
        () => {




        },
        [percent],
    );

    //Effects methods
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

                        test(fireBaseUrl);



                    })
            })
    }

    const test = async(url) =>{

        console.log(url);

        const user = await checkUser();

        if (!user.connected) {
            toastify.Warning("You must be logged in to upload creation !");
        } else
        {

            const userId = user.user.id;

            const res = await fetch('http://localhost:3000/api/creation/addCreation', {

                method: 'post',

                body:JSON.stringify({ url, userId })

            })
        }

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
                    <ProgressBar className={styles.progressBar} now={percent} label={`${percent}%`}/>

                </div>
            </Modal.Body>
        </Modal>
    );
}



export default function UploadImage({competition}){

    const [modalShow, setModalShow] = useState(false);
    const toastify = useContext(ToastifyContext);



    //Effects Methods
    const handleClickUpload = async () => {

        const user = await checkUser();


        if (!user.connected) {
            toastify.Warning("You must be logged in to upload creation !");
        } else
        {

            const creationExist = await getCreationByCompetition(user.user.id, competition._id);

            console.log(creationExist);

            // if(creationExist.find !== false)
            // {
            //     toastify.Warning("You have already upload your creation !");
            // }
            // else
            // {
                setModalShow(true);
            // }


        }


    }



    return(
        <>
            <Button variant="primary" className="p-5" onClick={handleClickUpload}>Upload Image</Button>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )

}