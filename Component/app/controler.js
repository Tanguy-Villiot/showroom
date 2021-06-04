/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */
import global from './app.module.css'

import Header from "./header";
import Footer from "./footer";
import Creation from "./creation/controler";
import {useContext, useEffect, useState} from "react";
import {useCurrentUser} from "../security/user/userContext";
import SignIn from "./signin";
import {useRouter} from "next/router";
import CompetitionContext from "../competition/competitionContext";
import Vote from "./vote";

export default function Application(){

    const {competition} = useContext(CompetitionContext)

    function RenderPage(){

        if(competition.vote)
        {
            return <Vote competition={competition}/>
        }
        else
        {
            return <Creation />
        }

    }


    return (
        <div className={global.Application}>

            <Header/>

            <RenderPage />


            <Footer />
        </div>
    )

}
