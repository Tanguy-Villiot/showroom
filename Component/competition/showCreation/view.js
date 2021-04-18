import styles from "../../../styles/competition.module.css";
import {Button} from "react-bootstrap";
import UploadImage from "./ModalUpload/uploadImage";
import Head from 'next/head'
import VoteImage from "./ModalVote/voteImage";
import {useState} from "react";


export default function View({images, handleClickReload, competition, addVote}) {


    const[imageVoted, setImageVoted] = useState([])
    const [likeStyle, setLikeStyle] = useState(false);

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

    function handleClickLike(e){

        setLikeStyle(true);
        

    }

    function handleAnimationLikeEnd(){

        setLikeStyle(false);

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

                    <img src="Competition/Design.png" className={styles.titleContainer_image} alt="image" />

                    <div className={styles.titleContainer_text}>
                        <h1 className={styles.title}>{competition.theme}</h1>
                        <h5 className={styles.subtitle}>"{competition.history}"</h5>

                    </div>



                </div>




                { competition.vote ?

                    <div className={styles.imagesContainer}>

                        {typeof(images) !== "undefined" &&
                        images.map(function (item, i) {
                            return (
                                <div key={i} data-src={item.url} onClick={handleClickVote} className={styles.item} style={{marginBottom: '1em' }}>

                                    <img src={item.url} className={styles.item_image} key={i} alt={item._id}/>

                                    <div className={styles.item_infos}>

                                        <div className={likeStyle ? styles.item_infos_like + " " + styles.is_animating : styles.item_infos_like} onClick={handleClickLike} onAnimationEnd={handleAnimationLikeEnd}>

                                        </div>

                                        <div className={styles.item_infos_button_container}>

                                            <div className={styles.item_infos_button}>

                                                <img src="Competition/enlarge.svg" className={styles.item_infos_button_extend_img} alt="extend" />

                                            </div>

                                            <div className={styles.item_infos_button}>

                                                <img src="Competition/link.svg" className={styles.item_infos_button_extend_img} alt="extend" />

                                            </div>

                                        </div>


                                        <h3 className={styles.item_infos_title}>{item.title}</h3>


                                        <span className={styles.item_infos_description}>{item.description}</span>

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

                <div className={styles.toolBar}>

                    <div className={styles.toolBar_Button}>

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


                    <img src='homepage/svg-path.svg' className={styles.toolBarSVG} alt=""/>
                </div>

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