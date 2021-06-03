/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */

import Homepage from "./index";
import {useEffect, useState} from "react";
import AddCreation from "./AddCreation";

export default function Creation()
{
    const [image, setImage] = useState(null)
    const [value, setValue] = useState("Homepage")

    function handleImageImporte(image)
    {
        setImage(image)

        setValue("Add")
    }

    function handleReturnToHome()
    {

        console.log("click")
        setValue("Homepage")
    }

    function RenderPage()
    {

        switch (value)
        {
            case 'Homepage':
                return <Homepage handleImageImporte={(val) => handleImageImporte(val)} />
            case 'Add':
                return <AddCreation image={image} handleReturnToHomePage={() => handleReturnToHome()}/>
            default:
                return <Homepage changePage={(val) => changePage(val)} />
        }
        
    }

    useEffect(() =>{


    }, [value])


    return (
        <>

            <RenderPage />


        </>

    )

}


