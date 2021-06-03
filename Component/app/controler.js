/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */
import global from './app.module.css'

import Header from "./header";
import Footer from "./footer";
import Creation from "./creation/controler";
import {useEffect, useState} from "react";
import {useCurrentUser} from "../security/user/userContext";
import SignIn from "./signin";
import {useRouter} from "next/router";

export default function Application(){

    const {currentUser} = useCurrentUser();

    const [page, setPage] = useState("creation")

    function RenderPage(){

        switch (page)
        {
            case "creation":
                return <Creation />
            case "vote":
                return <Creation />
            case "profile":
                if(currentUser.connected)
                {
                    return <Profile />
                }
                else
                {
                    return <SignIn />
                }
            default:
                return <Creation />
        }

    }

    function changePage(value)
    {
        setPage(value)
    }


    useEffect(() => {

    }, [page])


    return (
        <div className={global.Application}>

            <Header changePage={(value) => changePage(value)}/>

            <RenderPage />


            <Footer />
        </div>
    )

}
