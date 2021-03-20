import {useEffect} from "react";
import {getActualCompetition, getBestVote} from "../../Component/bdd/competition/dataCompetition";

export default function Reveal(){

    useEffect(() =>{


            getActualCompetition()
                .then(result =>{

                    getBestVote(result[0]._id)
                        .then(res =>{

                            console.log(res)

                        })

                })



        },
        [],
    );


    return(
        <h1>Reveal Page</h1>
    )

}