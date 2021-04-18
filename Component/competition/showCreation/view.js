import styles from "../../../styles/competition.module.css";
import {Button} from "react-bootstrap";
import UploadImage from "./ModalUpload/uploadImage";
import Head from 'next/head'
import VoteImage from "./ModalVote/voteImage";
import {useState} from "react";


export default function View({images, handleClickReload, competition, addVote}) {


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

    const handleClickSubmitVote = (image) => {


        addVote(image);

    }

    function handleClickCurtail(e){


        console.log(e.target.offsetParent.offsetParent)

        e.target.offsetParent.offsetParent.style.animationDelay = "1.4s";

    }


    return (
        <>
            <Head>
                <title>Showroom - Competition</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <div className="container-md mt-5">

                <div className={styles.titleContainer}>

                    <h1 className={styles.title}>{competition.theme}</h1>
                    <h5 className={styles.subtitle}>"{competition.history}"</h5>


                    <img
                        src="/Competition/camera.svg"
                        alt="Picture of the author"
                        className={styles.titleContainer_image1}
                    />

                    <img
                        src="/Competition/pencil.svg"
                        alt="Picture of the author"
                        className={styles.titleContainer_image2}
                    />


                    <img
                        src="/Competition/headphones.svg"
                        alt="Picture of the author"
                        className={styles.titleContainer_image3}
                    />

                    <img
                        src="/Competition/cube.svg"
                        alt="Picture of the author"
                        className={styles.titleContainer_image4}
                    />

                    <img
                        src="/Competition/carrot.svg"
                        alt="Picture of the author"
                        className={styles.titleContainer_image5}
                    />


                </div>


                <div className="mb-5">

                    {competition.finish ?

                        <>
                            <Button variant="warning" className={styles.refreshButton} onClick={handleClickReload}>Refresh</Button>

                            <span className="text-muted">La compétition est terminé</span>

                        </>

                        :

                        competition.vote ?

                            <>
                                <Button variant="warning" className={styles.refreshButton} onClick={handleClickReload}>Refresh</Button>

                                <VoteImage images={imageVoted} setImagesVote={setImageVoted} submitVote={handleClickSubmitVote}/>
                            </>

                            :

                            <div className="text-center">
                                <UploadImage competition={competition}/>

                            </div>

                    }





                </div>



                { competition.vote ?

                    <div className={styles.imagesContainer}>

                        {typeof(images) !== "undefined" &&
                        images.map(function (item, i) {
                            return (
                                <div key={i} data-src={item.url} onClick={handleClickVote} className={styles.item} style={{marginBottom: '1em' }}>

                                    <img src={item.url} className={styles.item_image} key={i} alt={item._id}/>

                                    <div className={styles.item_infos}>

                                    </div>

                                </div>
                            );
                        })
                        }


                    </div>

                    :

                    <>


                    </>




                }

            </div>

            <div className={"position-absolute w-100 h-100 " + styles.curtain}>

                <div className={"container " + styles.curtain_contain}>
                    <div className="row">

                        <div className="col-sm overflow-hidden">

                            <img src='homepage/Illu-AS.gif' className={styles.MonthCompetition_ill} alt=""/>

                        </div>

                        <div className="col-sm">

                            <h1 className={styles.MonthCompetition_text}>Participer au concours du mois sur l'univers <br/><span style={{color: "#7a5995"}}>{competition.theme}</span></h1>

                            <p className={styles.MonthCompetition_subtext}>"{competition.history}"</p>

                            <button className={styles.MonthCompetition_button} onClick={handleClickCurtail}>Accéder</button>

                        </div>

                    </div>
                </div>


            </div>

        </>
    )


}