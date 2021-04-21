/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */

import styles from "./ViewVoteState.module.css";
import {Button} from "react-bootstrap";
import VoteImage from "./ModalVote/voteImage";
import {useState} from "react";
import UniqueCreation from "./UniqueCreation/UniqueCreation";
import cookieCutter from "cookie-cutter";


export default function ViewVoteState({images, handleClickReload, competition, setVote}) {

    const[imageVoted, setImageVoted] = useState([])
    const [enableUnique, setEnableUnique] = useState(false);
    const [imageSelected, setImageSelected] = useState(undefined);

    //EFFECT METHOD

    /**
     * Add Image in list of voted image
     *
     */
    const handleClickVote = (id) => {

        let x = JSON.parse(cookieCutter.get('Votelist'));

        const image={
            id: images[id]._id,
            url: images[id].url
        }


        x.push(image);

        setImageVoted(x);



        cookieCutter.set('Votelist', JSON.stringify(x))


    }



    /**
     * Open modal creation for see creation largest
     *
     * @param {string} id Id in table Image of creation
     */
    function handleOpenUnique(id){

        setImageSelected(images[id]);

        setEnableUnique(true);


    }





    const handleClickSubmitVote = (image) => {


        setVote(image);

    }


    function handleClickCurtail(e){


        console.log(e.target.offsetParent.offsetParent)

        e.target.offsetParent.offsetParent.style.animationDelay = "1.4s";

    }


    return (
        <>

            <UniqueCreation enable={enableUnique} creation={imageSelected} setEnable={setEnableUnique}/>

                    <div className="container-md mt-5">

                            <div className={styles.imagesContainer}>

                                {typeof(images) !== "undefined" &&
                                images.map(function (item, i) {
                                    return (
                                        <div key={i} data-src={item.url} className={styles.item} style={{marginBottom: '1em' }}>

                                            <img src={item.url} className={styles.item_image} key={i} alt={item._id} onClick={() => handleOpenUnique(i)} onContextMenu={(e) => {

                                                e.preventDefault(); return false
                                            }}/>

                                            <div className={styles.item_infos}>

                                                <div className={styles.item_infos_like} onClick={() => handleClickVote(i)}>

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

                        <div className={styles.toolBar}>

                            <div className={styles.toolBar_Button}>

                                <Button variant="warning" className={styles.refreshButton} onClick={handleClickReload}>Refresh</Button>

                                <VoteImage setImagesVote={setImageVoted} submitVote={handleClickSubmitVote}/>

                            </div>


                            <img src='homepage/svg-path.svg' className={styles.toolBarSVG} alt=""/>
                        </div>

                    </div>

                    {/*<div className={"position-absolute w-100 h-100 " + styles.curtain}>*/}

                    {/*    <div className={"container " + styles.curtain_contain}>*/}
                    {/*        <div className="row">*/}

                    {/*            <div className="col-sm overflow-hidden">*/}

                    {/*                <img src='homepage/Illu-AS.gif' className={styles.MonthCompetition_ill} alt=""/>*/}

                    {/*            </div>*/}

                    {/*            <div className="col-sm">*/}

                    {/*                <h1 className={styles.MonthCompetition_text}>Participer au concours du mois sur l'univers <br/><span style={{color: "#7a5995"}}>{competition.theme}</span></h1>*/}

                    {/*                <p className={styles.MonthCompetition_subtext}>"{competition.history}"</p>*/}

                    {/*                <button className={styles.MonthCompetition_button} onClick={handleClickCurtail}>Accéder</button>*/}

                    {/*            </div>*/}

                    {/*        </div>*/}
                    {/*    </div>*/}


                    {/*</div>*/}





        </>
    )


}