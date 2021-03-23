import {useEffect, useState} from "react";
import {getActualCompetition, getBestVote} from "../../Component/bdd/competition/dataCompetition";

export default function Reveal(){

    const [images, setImages] = useState([])

    const [competition, setCompetition] = useState({})

    useEffect(() =>{


            getActualCompetition()
                .then(result =>{

                    setCompetition(result[0]);

                    console.log(result[0]);

                    getBestVote(result[0]._id, 3)
                        .then(res =>{



                            const img = []

                            res.map(function (item, i) {

                                img.push(item)

                            })

                            setImages(img);

                        })

                })



        },
        [],
    );





    return <div>

        <div className="text-center mt-5">
            <h1>Reveal</h1>
        </div>

        <div className="container-md mt-5">

            {competition.finish ?


                <>

                    {images.length >= 1 ?

                        <div className="text-center">

                            <img src={images[0].url} style={{height: "15em", borderRadius: "4px"}} alt={images[0]._id}/>

                        </div>

                        :

                        <>
                            <span className="text-muted">Loading....</span>
                        </>

                    }
                </>

                :

                <>
                    <span>Le concours n'est pas encore terminé. Revenez à la fin du mois !</span>


                </>


            }






        </div>

    </div>

}