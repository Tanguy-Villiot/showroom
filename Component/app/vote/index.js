/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */
import styles from './vote.module.css'
import checkServer from "../../bdd/checkServer";
import {useEffect, useState} from "react";
import UniqueCreation from "../../competition/voteState/UniqueCreation/UniqueCreation";
import VoteImage from "../../competition/voteState/ModalVote/voteImage";


export default function Vote({competition}){

    const [images, setImages] = useState([]);
    const [enableUnique, setEnableUnique] = useState(false);
    const [imageSelected, setImageSelected] = useState(undefined);

    const handleClickReload = async () => {

        fetchImage(competition._id)
            .then(res => {
                setImages(res);
            })

    }

    const fetchImage = async (competitionId) => {

        const server = checkServer();

        const res = await fetch(`${server}/api/creation/getCreation`, {
            method: "POST",
            body:JSON.stringify({ competitionId }),
            headers: { "Content-Type": "application/json" },
        });


        return await res.json();

    }

    useEffect(() => {

        fetchImage(competition._id)
            .then(res => {

                setImages(res);

            })


    })


    return (
        <>
            {images === [] ?

                <>
                    <p style={{marginTop: "10em"}}>Loading...</p>
                </>

                :

                <>

                    <UniqueCreation enable={enableUnique} creation={imageSelected} setEnable={setEnableUnique}/>

                    <div className={styles.container + " mt-5"}>

                        <div className={styles.imagesContainer}>

                            {typeof(images) !== "undefined" &&
                            images.map(function (item, i) {
                                return (
                                    <div key={i} data-src={item.url} className={styles.item}>

                                        <img src={item.url} className={styles.item_image} key={i} alt={item._id} onClick={() => handleOpenUnique(i)} onContextMenu={(e) => {

                                            e.preventDefault(); return false
                                        }}/>

                                        <div className={styles.item_infos}>

                                            {/*<div className={styleLike(item._id)} onClick={() => handleClickVote(i)}>*/}

                                            {/*</div>*/}

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

                                <img src='Competition/refresh.svg' className={styles.refreshButton} onClick={handleClickReload} alt=""/>


                                {/*<Button variant="warning" className={styles.refreshButton} onClick={handleClickReload}>Refresh</Button>*/}


                                {/*<VoteImage setImagesVote={setImageVoted} submitVote={handleClickSubmitVote}/>*/}

                            </div>

                        </div>

                    </div>
                </>


            }


        </>
    )


}
