/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */

import UploadImage from "./ModalUpload/uploadImage";

export default function ViewCreationState({competition, toastify}){

    return (

        <>

            <div className="text-center">
                <UploadImage competition={competition} toastify={toastify}/>

            </div>

        </>


    )


}