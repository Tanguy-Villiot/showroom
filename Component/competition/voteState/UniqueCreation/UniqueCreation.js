/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */

import styles from './UniqueCreation.module.css'
import {useState} from "react";
import cookieCutter from "cookie-cutter";

export default function UniqueCreation({creation, enable, setEnable}){

    const [styleMain, setStyleMain] = useState(styles.main);
    const [styleInfo, setStyleInfo] = useState();

    const [creationLiked, setCreationLiked] = useState(undefined);


    if(enable)
    {
        document.body.style.overflow = 'hidden'
    }

    function checkIfLiked()
    {
        let voteList = JSON.parse(cookieCutter.get('Votelist'))

        for (let i = 0; i < voteList.length; i++) {

            if(voteList[i].id === creation._id)
            {

                return true;

                break;

            }

        }

        return false;

    }

    function handleChangeAnimation(){

        setStyleMain(styles.main + " " + styles.close);

    }

    function handleClose(){

        if(styleMain === styles.main + " " + styles.close){
            document.body.style.overflow = 'visible'

            setStyleMain(styles.main)
            setEnable(false);
        }

    }

    function handleMouseEnterInfo(){

        setStyleInfo(styles.tools_infos);

    }

    function handleMouseLeaveInfo(){

        if(styleInfo === styles.tools_infos)
        {
            setStyleInfo(styles.tools_infos + " " + styles.closeInfos);
        }

    }

    function handleCloseInfo()
    {
        if(styleInfo === styles.tools_infos + " " + styles.closeInfos){

            setStyleInfo()
        }
    }

    function handleClickLike(){

        console.log("debut");

        let voteList = JSON.parse(cookieCutter.get('Votelist'));

        if(!checkIfLiked())
        {
            console.log("pas liké");


            const image={
                id: creation._id,
                url: creation.url
            }

            voteList.push(image);

            setCreationLiked(true)
        }
        else
        {
            console.log("liké donc delikage");


            voteList = voteList.filter(function(item){
                return item.id !== creation._id
            })

            setCreationLiked(false)

        }


        cookieCutter.set('Votelist', JSON.stringify(voteList))


        console.log(JSON.parse(cookieCutter.get('Votelist')));



    }

    function handleAnimationEndLike(){

        // setStyleLike(undefined);

    }


    //VIEW METHODS


    /**
     * Choose style for like button
     *
     */
    function styleLikeButton(){

        let list = JSON.parse(cookieCutter.get('Votelist'));

        let liked = false;



        list.map(function (item, i) {

            if(item.id === creation._id)
            {
                liked = true;
            }

        });

        if(liked)
        {
            return styles.like_true
        }
        else
        {
            return styles.like
        }

    }


    return (
        <>
        {enable ?
            <>

                <div className={styleMain} onAnimationEnd={handleClose}>

                    <div className={styles.clickable} onClick={handleChangeAnimation}>

                    </div>

                    <div className={styles.closeButton}>
                        <img src="/Competition/close.svg" className={styles.closeImage} alt="close" onClick={handleChangeAnimation}/>
                    </div>

                    <div className={styles.imageContainer}>

                        <img src={creation.url} className={styles.image} alt="creation" onMouseLeave={handleMouseLeaveInfo} onContextMenu={(e) => {

                            e.preventDefault(); return false
                        }}/>

                        <div className={styleInfo} style={{display: "none"}} onMouseLeave={handleMouseLeaveInfo} onAnimationEnd={handleCloseInfo}>
                            <h2 className={styles.tools_infos_title}>{creation.title}</h2>
                            <span className={styles.tools_infos_description}>{creation.description}</span>
                        </div>

                        <div className={styles.tools} onMouseEnter={handleMouseEnterInfo}>

                            <img src="/Competition/info.svg" alt="up-arrow" className={styles.tools_icon}/>

                        </div>

                        <div className={styles.tools} style={{right: "0px"}} >


                            <img src="/Competition/like.svg" alt="up-arrow" className={styleLikeButton()} onClick={handleClickLike} onAnimationEnd={handleAnimationEndLike}/>

                        </div>






                    </div>


                </div>


            </>


            :

            <>

            </>


        }

        </>
    )


}