import styles from "./vote.module.css";
import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";

export default function Vote(){

    const[images, setImages] = useState("loading...")


    let consoleLogActive = true;

    const consoleLog = (message, active) =>{

        if(active || consoleLogActive)
        {
            console.log(message);
        }

    }


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
            ajax('https://jsonplaceholder.typicode.com/photos?_page=0&_limit=12')
                .then(function (response) {
                    let json = JSON.parse(response);
                    setImages(json);
                    consoleLog(json);
                }).catch(function(req){
                console.log("Error");
            })

        },
        [],
    );



    const CreateTable = () => {

        return <>

            {!Array.isArray(images) ?
                <h2>Loading ...</h2>
                :
                images.map(function(item, i){
                    console.log('test');
                    return <img key={i} src={item.url} className={styles.images}/>
                })
            }

        </>;



    }


    return <div className={styles.Container}>
        <h2>Vote pour tes créations favorites</h2>
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