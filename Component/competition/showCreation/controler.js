import {useContext, useEffect, useState} from "react";
import View from "./view";
import checkUser, {checkVote} from "../security/security-utils";
import ToastifyContext from "../../toastify/context";

export default function ShowCreation({data}){

    const toastify = useContext(ToastifyContext);


    const [images, setImages] = useState(data);
    const [imageVote, setImageVote] = useState({
        id: null,
        url: "https://via.placeholder.com/125"
    });


    const fetchImage = async () => {

        const dev = process.env.NODE_ENV !== 'production';

        const server = dev ? 'http://localhost:3000' : 'https://showroom-fawn.vercel.app';

        const res = await fetch(`${server}/api/creation/getCreation`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });


        return await res.json();

    }


    /////////////// EFFECTS METHODS ////////////////

    const handleClickReload = async () => {

        const dev = process.env.NODE_ENV !== 'production';

        const server = dev ? 'http://localhost:3000' : 'https://showroom-fawn.vercel.app';

        const res = await fetch(`${server}/api/creation/getCreation`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json()

        setImages(data);

    }

    const handleClickVote = (image) => {

        const img = {
            id: image.target.getAttribute("alt"),
            url: image.target.getAttribute("src")
        }

        console.log(img);

        setImageVote(img);

    }

    const handleClickSubmitVote = async (e) => {

            const idCreation = e.target.alt;


            const user = await checkUser();

            if(!user.connected)
            {
                toastify.Warning("You must be logged in to vote !");
            }
            else {
                const idUser = user.user.id;


                const voteExist = await checkVote(idUser);

                console.log(voteExist);

                if (voteExist.find !== false) {
                    toastify.Warning("You have already voted !");
                } else {
                    const dev = process.env.NODE_ENV !== 'production';

                    const server = dev ? 'http://localhost:3000' : 'https://showroom-fawn.vercel.app';


                    const res = await fetch(`${server}/api/creation/voteCreation`, {

                        method: 'post',

                        body: JSON.stringify({idCreation, idUser})

                    })
                }
            }

    }



    useEffect(() =>{


            console.log('render');


            fetchImage()
                .then(res => {
                    setImages(res);
                })


        },
        [],
    );


    return (
        <>

            <View images={images} handleClickReload={handleClickReload} handleClickVote={handleClickVote} imageVote={imageVote}/>

        </>
    )

}