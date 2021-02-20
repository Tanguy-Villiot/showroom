import styles from "./vote.module.css";
import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";

export default function Vote(){

    const[images, setImages] = useState("loading...")

    let img = "loading...";

    let ajax = function (url) {

        return new Promise(function (resolve, reject) {

            let req = new XMLHttpRequest()
            req.open('GET', url, true)
            req.onreadystatechange = function (aEvt) {
                if (req.readyState === 4) {
                    if (req.status === 200)
                        resolve(req.responseText)
                    else
                        reject(req)
                }
            };
            req.send(null)

        })
    }






    useEffect(
        () => {
            ajax('https://jsonplaceholder.typicode.com/photos/1')
                .then(function (response) {
                    let test = JSON.parse(response);
                    setImages(test);
                    console.log(test);
                }).catch(function(req){
                console.log("Error");
            })

        },
        [],
    );



    const CreateTable = () => {


        return <></>;



    }


    return <div className={styles.Container}>
        <div className={styles.imagesContainer}>
            <CreateTable />
        </div>
        <div className={styles.voteContainer}>
            <img className={styles.voteImage} src="https://via.placeholder.com/125"/>
            <img className={styles.voteImage} src="https://via.placeholder.com/125"/>
            <img className={styles.voteImage} src="https://via.placeholder.com/125"/>
            <Button name="Vote" className="mr-2" variant="primary">Submit</Button>
        </div>
    </div>

}