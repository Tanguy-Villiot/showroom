import styles from "./vote.module.css";
import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import {AiOutlineLoading3Quarters} from "react-icons/ai";




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


export default function Vote({ data }){

    const[images, setImages] = useState("loading...")

    const[count, setCount] = useState(0);


    let consoleLogActive = false;

    const consoleLog = (message, active) =>{

        if(active || consoleLogActive)
        {
            console.log(message);
        }

    }






    useEffect(
        () => {

            // ajax('https://picsum.photos/v2/list?page=1&limit=100')
            //     .then(function (response) {
            //
            //         consoleLog(response);
            //
            //         getImages(response)
            //             .then(function (res){
            //
            //                 setImages(res);
            //
            //                 consoleLog(res);
            //
            //             }).catch(function (res){
            //
            //         });
            //
            //
            //
            //
            //
            //     }).catch(function(req){
            //     console.log("Error");
            // })
        },
        [count, data],
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


    return

}

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`https://picsum.photos/v2/list?page=1&limit=100`)
    const data = await res.json()

    const datas = await getImages(data);


    // Pass data to the page via props
    return { props: { datas } }
}