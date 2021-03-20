import styles from "../../../styles/competition.module.css";
import Image from "next/image";
import {Button} from "react-bootstrap";
import UploadImage from "../uploadImage";
import Head from 'next/head'
import VoteImage from "../voteImage";
import {useState} from "react";



export default function View({images, handleClickReload, competition}) {


    const[imageVoted, setImageVoted] = useState([])

    //EFFECT METHOD

    const handleClickVote = (e) => {

        const x = imageVoted;

        const image={
            id: e.target.getAttribute("alt"),
            url: e.target.getAttribute("src")
        }

        x.push(image);

        setImageVoted(x);

    }


    return (
        <>
            <Head>
                <title>Showroom - Competition</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <div className="container-md mt-5">

                <div className="mb-5 text-center">

                    <h1>{competition.theme}</h1>
                    <h5 className="font-italic">"{competition.history}"</h5>

                </div>


                <div className="mb-5">

                    {competition.finish ?

                        <span className="text-muted">La compétition est terminé</span>

                        :

                        competition.vote ?

                            <>
                                <Button variant="warning" className={styles.refreshButton} onClick={handleClickReload}>Refresh</Button>

                                <VoteImage images={imageVoted} setImagesVote={setImageVoted} />
                            </>

                            :

                            <>
                                <UploadImage competition={competition}/>


                                <Button variant="warning" className={styles.refreshButton} onClick={handleClickReload}>Refresh</Button>
                            </>

                    }





                </div>




                <div className={styles.imagesContainer}>

                    {typeof(images) !== "undefined" &&
                    images.map(function (item, i) {
                        return (
                            <div key={i} data-src={item.url} onClick={handleClickVote} style={{marginBottom: '1em' }}>

                                <img src={item.url} className={styles.item_image} key={i} alt={item._id}/>

                            </div>
                        );
                    })
                    }


                </div>

            </div>
        </>
    )


}