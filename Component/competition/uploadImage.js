import styles from './uploadImage.module.css';
import {Button, Modal} from "react-bootstrap";
import {useState} from "react";




function MyVerticallyCenteredModal(props) {
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

                        <input type="file" className="upload-input" />

                    </div>

                    <button type="button">Upload file</button>
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