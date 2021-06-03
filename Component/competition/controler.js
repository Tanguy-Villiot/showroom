/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */

import {useContext, useEffect, useState} from "react";
import ViewVoteState from "./voteState/viewVoteState";
import checkUser, {checkVote} from "./security/security-utils";
import ToastifyContext from "../toastify/context";
import {getVoteByCompetition} from "../bdd/user/dataUser";
import {voteForCreation} from "../bdd/creation/actionCreation";
import {addVoteUser} from "../bdd/user/actionUser";
import checkServer from "../bdd/checkServer";
import cookieCutter from 'cookie-cutter'
import ViewHeader from "./header/viewHeader";
import ViewCreationState from "./creationState/viewCreationState";

import CompetitionContext from '../competition/competitionContext';
import Footer from "../footer";

export default function ShowCreation(){

    const {competition} = useContext(CompetitionContext)

    const toastify = useContext(ToastifyContext);

    const [images, setImages] = useState([]);



    /////////////// API METHODS ////////////////

    const fetchImage = async (competitionId) => {

        const server = checkServer();

        const res = await fetch(`${server}/api/creation/getCreation`, {
            method: "POST",
            body:JSON.stringify({ competitionId }),
            headers: { "Content-Type": "application/json" },
        });


        return await res.json();

    }


    const setVote = async (imageId) => {

        const competitionId = competition._id;

        const user = await checkUser();

        if(!user.connected)
        {
            toastify.Warning("You must be logged in to vote !");
        }
        else {
            const idUser = user.user.id;


            const voteExist = await getVoteByCompetition(idUser, competitionId);


            if (voteExist.find !== false) {
                toastify.Warning("You have already voted !");
            } else {


            await voteForCreation(imageId, competitionId);

            await addVoteUser(idUser, competitionId);

            toastify.Success("Your vote has been sent !")
            }
        }

    }


    /////////////// EFFECTS METHODS ////////////////

    const handleClickReload = async () => {

        fetchImage(competition._id)
            .then(res => {
                setImages(res);
            })

    }



    useEffect(() =>{


                    //Firt step check if creation or vote state
                    if(competition.vote)
                    {

                        //Second step get image if vote state
                        fetchImage(competition._id)
                            .then(res => {
                                setImages(res);

                                console.log(res);



                                //Third step init cookie Votelist if don't exist

                                if(cookieCutter.get('Votelist') === undefined)
                                {
                                    cookieCutter.set('Votelist', JSON.stringify([]));
                                }

                                console.log(cookieCutter.get('Votelist'));

                                // cookieCutter.set('Votelist', '', { expires: new Date(0) })


                            })


                    }
                    else
                    {
                        setImages(undefined)
                    }




        },
        [],
    );



    return (
        <>

            {images === [] ?

                <>

                    <span>Loading...</span>

                </>

                :

                <>

                    <ViewHeader competition={competition}/>


                    {competition.finish ?

                        <>

                            <span>Competition terminé</span>

                        </>


                        :

                        <>

                            {competition.vote === undefined ?

                                <>
                                </>

                                :

                                <>
                                    {competition.vote ?

                                        <ViewVoteState competition={competition}
                                                       images={images}
                                                       handleClickReload={handleClickReload}
                                                       setVote={setVote}
                                        />

                                        :

                                        <ViewCreationState competition={competition} toastify={toastify}/>

                                    }
                                </>


                            }

                        </>
                    }


                </>
            }

            <Footer />

        </>

    )

}