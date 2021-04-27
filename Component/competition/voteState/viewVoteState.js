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
     * Add creation in list of image voted
     *
     * @param {string} id Id of creation in list image
     */
    const handleClickVote = (id) => {

        //First check if creation is in votedList cookie

        let voteList = JSON.parse(cookieCutter.get('Votelist'))

        let found = false;

        for (let i = 0; i < voteList.length; i++) {

            if(voteList[i].id === images[id]._id)
            {


                found = true;

                break;

            }
            else
            {
                found = false;

            }

        }


        //Second add or remove creation in list

        if(found)
        {
            voteList = voteList.filter(function(item){
                return item.id !== images[id]._id
            })

        }
        else
        {
            const image={
                id: images[id]._id,
                url: images[id].url
            }


            voteList.push(image);
        }


        //Third set cookie and local state

        setImageVoted(voteList);



        cookieCutter.set('Votelist', JSON.stringify(voteList))


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



    /**
     * Vote for creation
     *
     * @param {number} image Id of image
     */
    const handleClickSubmitVote = (image) => {

        setVote(image);

    }




    //VIEW METHOD


    /**
     * Choose style for like button
     *
     * @param {number} id Id of image
     */
    function styleLike(id){

        let list = JSON.parse(cookieCutter.get('Votelist'));

        if(list === undefined)
        {
            list = []
        }

        let liked = false;



        list.map(function (item, i) {

            if(item.id === id)
            {
                liked = true;
            }

        });

        if(liked)
        {
            return styles.item_infos_like_true
        }
        else
        {
            return styles.item_infos_like
        }

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

                                                <div className={styleLike(item._id)} onClick={() => handleClickVote(i)}>

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






        </>
    )


}