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
import {getActualCompetition} from "../bdd/competition/dataCompetition";
import checkServer from "../bdd/checkServer";
import cookieCutter from 'cookie-cutter'
import ViewHeader from "./header/viewHeader";
import ViewCreationState from "./creationState/viewCreationState";

export default function ShowCreation(){

    const toastify = useContext(ToastifyContext);


    const [competition, setCompetition] = useState({})
    const [images, setImages] = useState([]);



    //API METHODS

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



        //First step get Actual Competition

            getActualCompetition()
                .then(res => {
                    setCompetition(res[0])

                    //Second step check if creation or vote state
                    if(res[0].vote)
                    {

                        //Third step get image if vote state
                        fetchImage(res[0]._id)
                            .then(res => {
                                setImages(res);

                                console.log(res);



                                //Fourth step init cookie Votelist if don't exist

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



                })

        },
        [],
    );



    return (
        <>

            {competition === {} ?

                <>

                </>

                :

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

                                                <ViewCreationState competition={competition}/>

                                            }
                                        </>


                                    }

                                </>
                            }


                        </>
                    }

                </>

            }




        </>
    )

}