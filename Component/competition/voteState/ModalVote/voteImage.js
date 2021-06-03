import styles from './vote.module.css';
import {Button, Modal, ProgressBar} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import ToastifyContext from "../../../toastify/context";
import cookieCutter from "cookie-cutter";

function MyVerticallyCenteredModal(props) {


    const [images, setImages] = useState([]);
    const toastify = useContext(ToastifyContext);


    const checkInList = (id) => {

        let found = false;

        for (let i = 0; i < images.length; i++) {

            if(images[i].id === id)
            {
                found = true;

                break;

            }
            else
            {
                found = false;

            }

        }

        return found;

    }


    const checkClass = (id) => {

        let style = '';

        if(images.length === 0)
        {
            style = styles.images;
        }


        if(checkInList(id))
        {
            style = styles.image_click;
        }
        else
        {
            style = styles.images;

        }

        return style;

    }


    //EFFECT METHODS


    const handleChooseImage = (e) => {

        const image ={
            id: e.target.getAttribute("alt"),
            url: e.target.getAttribute("src")
        }

        if(checkInList(image.id))
        {
            setImages(images.filter(item => item.id !== image.id))
        }
        else
        {
            setImages([...images, image]);
        }

    }

    const handleClickButton = () => {


        if(images.length === 0)
        {
            toastify.Warning("You must choose at least 1 creation to vote !");

        }
        else if(images.length === 1)
        {

            props.handleSubmit(images[0].id);
            props.onHide();
        }
        else
        {
            props.setlist(images);

            cookieCutter.set('Votelist', JSON.stringify(images))

            setImages([])
        }




    }




    useEffect(
        () => {

        },
        [images],
    );


    //VIEW METHODS

    const ButtonValidate = () => {

        let text = "";

        if(images.length === 1)
        {
            text = "Submit vote";

        }
        else
        {
            text = `Choose ${images.length} creations`;
        }


        return (

            <Button variant="primary" onClick={handleClickButton}>{text}</Button>

        )
    }



    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Vote for your favorite creation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>


                <div className={styles.imagesContainer}>

                    {
                        props.list.map(function (item, i) {
                            return (
                                <div key={i} data-src={item.url} style={{marginBottom: '1em', margin: 'auto'}} onClick={handleChooseImage}>

                                    <img src={item.url} key={i} alt={item.id} className={checkClass(item.id)}/>

                                </div>
                            );
                        })
                    }

                </div>



            </Modal.Body>
            <Modal.Footer>

                <ButtonValidate />

            </Modal.Footer>
        </Modal>
    );
}



export default function VoteImage({setImagesVote, submitVote}){

    const [modalShow, setModalShow] = useState(false);

    let images = [];

    if(cookieCutter.get('Votelist') !== undefined)
    {
        images = JSON.parse(cookieCutter.get('Votelist'))

    }



    //Effects Methods
    const handleClickUpload = () => {




        setModalShow(true);


    }

    const handleClickSubmit = (image) => {


        submitVote(image);
    }


    return(
        <>

            <img src='Competition/check.svg' className={styles.voteButton} onClick={handleClickUpload} alt=""/>


            {/*<Button variant="danger" onClick={handleClickUpload}>Vote</Button>*/}
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                list={images}
                setlist={setImagesVote}
                handleSubmit={handleClickSubmit}

            />
        </>
    )


}