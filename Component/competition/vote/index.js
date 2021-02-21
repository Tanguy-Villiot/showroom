import styles from "./vote.module.css";
import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import {AiOutlineLoading3Quarters} from "react-icons/ai";


export default function Vote(){

    const[images, setImages] = useState("loading...")

    const[count, setCount] = useState(0);


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
                    {
                        let json = JSON.parse(req.responseText);

                        resolve(json)
                    }
                    else
                        reject(req)
                }
            };
            req.send(null)

        })
    }

    let getImages = function (list) {

        return new Promise(function (resolve, reject) {

            let x = [];

            for(let i = 0; i <= 9; i++)
            {
                let item = list[Math.floor(Math.random() * list.length)];

                x.push(item);

            }

            if(x.length === 10)
            {
                resolve(x)
            }
            else
            {
                reject("List not contains 10 images");
            }

        })
    }



    useEffect(
        () => {

            ajax('https://picsum.photos/v2/list?page=1&limit=100')
                .then(function (response) {

                    consoleLog(response);

                    getImages(response)
                        .then(function (res){

                            setImages(res);

                            consoleLog(res);

                        }).catch(function (res){

                    });





                }).catch(function(req){
                console.log("Error");
            })
        },
        [count],
    );


    const handleClick = () =>{

        setCount(count + 1);

    }



    const CreateTable = () => {


        return <>

            {!Array.isArray(images) ?
                <h2>Loading ...</h2>
                :
                images.map(function(item, i){
                    return <div key={i} className={styles.item}>
                        <img src={item.download_url} className={styles.item_image}/>
                    </div>


                })
            }

        </>;



    }


    return <div className={styles.Container}>
        <div className={styles.actionBar}>

            <div className={styles.actionBar_alignleft}>
                <h2>Vote pour tes créations favorites</h2>
            </div>

            <div className={styles.actionBar_alignright}>
                <div className={styles.actionBar_reload} onClick={handleClick}>
                    <AiOutlineLoading3Quarters size={32}/>
                </div>
            </div>

        </div>
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