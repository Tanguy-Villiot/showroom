import {useContext, useEffect, useState} from "react";
import View from "./view";
import checkUser, {checkVote} from "../security/security-utils";
import ToastifyContext from "../../toastify/context";
import {getVoteByCompetition} from "../../bdd/user/dataUser";

export default function ShowCreation({data}){

    const toastify = useContext(ToastifyContext);


    const [competition, setCompetition] = useState({})
    const [images, setImages] = useState(data);



    //API METHODS

    const fetchCompetition = async () => {

        const dev = process.env.NODE_ENV !== 'production';

        const server = dev ? 'http://localhost:3000' : 'https://showroom-fawn.vercel.app';

        const res = await fetch(`${server}/api/competition/getActualCompetition`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });


        return await res.json();

    }

    const fetchImage = async (competitionId) => {

        const dev = process.env.NODE_ENV !== 'production';

        const server = dev ? 'http://localhost:3000' : 'https://showroom-fawn.vercel.app';

        const res = await fetch(`${server}/api/creation/getCreation`, {
            method: "POST",
            body:JSON.stringify({ competitionId }),
            headers: { "Content-Type": "application/json" },
        });


        return await res.json();

    }

    const addVote = async (imageId) => {

        const competitionId = competition._id;

        const user = await checkUser();

        if(!user.connected)
        {
            toastify.Warning("You must be logged in to vote !");
        }
        else {
            const idUser = user.user.id;


            const voteExist = await getVoteByCompetition(idUser, competitionId);

            console.log(voteExist);

            if (voteExist.find !== false) {
                toastify.Warning("You have already voted !");
            } else {
                const dev = process.env.NODE_ENV !== 'production';

                const server = dev ? 'http://localhost:3000' : 'https://showroom-fawn.vercel.app';


                const res = await fetch(`${server}/api/creation/voteCreation`, {

                    method: 'post',

                    body: JSON.stringify({imageId, idUser, competitionId})

                })

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


            console.log('render');

            fetchCompetition()
                .then(res => {
                    setCompetition(res[0])

                    fetchImage(res[0]._id)
                        .then(res => {
                            setImages(res);
                        })
                })

        },
        [],
    );


    return (
        <>

            <View competition={competition} images={images} handleClickReload={handleClickReload} addVote={addVote}/>

        </>
    )

}