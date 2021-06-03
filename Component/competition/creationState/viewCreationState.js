/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */

import styles from "./viewCreationState.module.css";

import UploadImage from "./ModalUpload/uploadImage";

export default function ViewCreationState({competition, toastify}){

    return (

        <div className="container">

            <h1 className={styles.title}>Participer au concours du mois</h1>

            <div className="text-center">
                <UploadImage competition={competition} toastify={toastify}/>

            </div>

        </div>


    )


}