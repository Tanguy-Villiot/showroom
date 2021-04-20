/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */

import styles from './UniqueCreation.module.css'
import {useState} from "react";

export default function UniqueCreation({creation, enable, setEnable}){

    const [styleMain, setStyleMain] = useState(styles.main);
    const [styleInfo, setStyleInfo] = useState("none")


    if(enable)
    {
        document.body.style.overflow = 'hidden'
    }

    function handleChangeAnimation(){



        setStyleMain(styles.main + " " + styles.close);

    }

    function handleClose(){

        console.log(styleMain)



        if(styleMain === styles.main + " " + styles.close){
            document.body.style.overflow = 'visible'

            setStyleMain(styles.main)
            setEnable(false);
        }

    }

    function handleMouseEnterInfo(){

        setStyleInfo("block");

    }

    function handleMouseLeaveInfo(){

        setStyleInfo("none");

    }

    return (
        <>
        {enable ?
            <>

                <div className={styleMain} onAnimationEnd={handleClose}>

                    <div className={styles.clickable} onClick={handleChangeAnimation}>

                    </div>

                    <div className={styles.closeButton}>
                        <img src="/Competition/close.svg" className={styles.closeImage} alt="close" onClick={handleClose}/>
                    </div>

                    <div className={styles.imageContainer}>

                        <img src={creation.url} className={styles.image} alt="creation" onMouseLeave={handleMouseLeaveInfo} onContextMenu={(e) => {

                            e.preventDefault(); return false
                        }}/>

                        <div className={styles.tools_infos} style={{display: styleInfo}} onMouseLeave={handleMouseLeaveInfo}>
                            <h2 className={styles.tools_infos_title}>{creation.title}</h2>
                            <span className={styles.tools_infos_description}>{creation.description}</span>
                        </div>

                        <div className={styles.tools} onMouseEnter={handleMouseEnterInfo}>

                            <img src="/Competition/info.svg" alt="up-arrow" className={styles.tools_icon}/>

                        </div>

                        <div className={styles.tools} style={{right: "0px"}}>

                            <img src="/Competition/like.svg" alt="up-arrow" className={styles.tools_icon}/>

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