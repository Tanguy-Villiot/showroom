import {Button} from "react-bootstrap";
import styles from '../../styles/competition.module.css';
import {useEffect, useState} from "react";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import Image from 'next/image'

function Competition({ data }){

    const[count, setCount] = useState(0);
    const[refreshImage, setRefreshImage] = useState(true);
    const[images, setImages] = useState({})
    const[imageChoose, setImageChoose] = useState({
        image1: "https://place-hold.it/125x125?text=125x125",
        image2: "https://place-hold.it/125x125?text=125x125",
        image3: "https://place-hold.it/125x125?text=125x125"
    })

    let countVote = 0;

    let consoleLogActive = true;
    const consoleLog = (message, active) =>{

        if(active || consoleLogActive)
        {
            console.log(message);
        }

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


    //EFFECTS METHODS

    const handleClickReload = () =>{

        setRefreshImage(true);
        setCount(count + 1);

    }


    const handleClickVote = (e) =>{

        let x = imageChoose;

        switch (countVote)
        {
            case 0:
                x.image1 = e.target.getAttribute("data-src");
                countVote++;
                break;
            case 1:
                x.image2 = e.target.getAttribute("data-src");
                countVote++;
                break;
            case 2:
                x.image3 = e.target.getAttribute("data-src");
                countVote++;
                break;
            default:

                break;
        }

        setImageChoose(x);

        consoleLog(imageChoose);

        setCount(count + 1);

    }



    useEffect(
        () => {


            if(refreshImage)
            {

                setRefreshImage(false);

                getImages(data)
                    .then(function (res){

                        setImages(res);

                        consoleLog(res);

                    }).catch(function (res){

                });

                console.log(images);

            }

            consoleLog(data);

        },
        [data, count],
    );



    //VIEW METHODS

    const CreateTable = () => {

        return <>

            {!Array.isArray(images) ?
                <h2>Loading ...</h2>
                :
                images.map(function(item, i){
                    return <div key={i} className={styles.item} onClick={handleClickVote} data-src={item.download_url}>

                        <Image src={item.download_url} alt={item.title} height={500} width={500}/>

                        {/*<img key={i} src={item.download_url} data-src={item.download_url} className={styles.item_image}/>*/}
                    </div>


                })
            }

        </>;

    }

    const Vote = () =>{

        return(
            <>
                <img className={styles.voteImage} src={imageChoose.image1}/>
                <img className={styles.voteImage} src={imageChoose.image2}/>
                <img className={styles.voteImage} src={imageChoose.image3}/>
                <Button name="Vote" className="mr-2" variant="primary">Submit</Button>
            </>
        )

    }



    return (
        <div>
            <div className="container-md mt-5">

                <div className={styles.Container}>
                    <div className={styles.actionBar}>

                        <div className={styles.actionBar_alignleft}>
                            <h2>Vote pour tes créations favorites</h2>
                        </div>

                        <div className={styles.actionBar_alignright}>
                            <div className={styles.actionBar_reload} onClick={handleClickReload}>
                                <AiOutlineLoading3Quarters size={32}/>
                            </div>
                        </div>

                    </div>
                    <div className={styles.imagesContainer}>
                        <CreateTable />
                    </div>
                    <div className={styles.voteContainer}>

                        <Vote />
                    </div>
                </div>

            </div>
        </div>

    )

    
}

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`https://picsum.photos/v2/list?page=1&limit=100`)
    const data = await res.json()

    // Pass data to the page via props
    return { props: { data } }
}

export default Competition;