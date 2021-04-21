/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */

import UploadImage from "./ModalUpload/uploadImage";

export default function ViewCreationState({competition}){

    return (

        <>

            <div className="text-center">
                <UploadImage competition={competition}/>

            </div>

        </>


    )


}