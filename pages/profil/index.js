import React, {useEffect, useState} from "react";
import { withIronSession } from "next-iron-session";
import Profil from "../../Component/profil/controler";
import {useRouter} from "next/router";
import {getDataUser} from "../../Component/bdd/user/dataUser";

export default function Page({user}){

    const router = useRouter()

    const [userData, setUserData] = useState(undefined)



    useEffect(() => {


        if(user.connected === false)
        {
            router.push('/')

        }

        getDataUser(user.email)
            .then(res => {
                setUserData(res[0])
            })

    }, [])

    return(

        <>
            {user.connected === false ?

                <>

                </>

                :

                userData === undefined ?

                <h1>Loading...</h1>

                :

                <Profil userData={userData}/>


            }

        </>

    )




}

export const getServerSideProps = withIronSession(
    async ({ req, res }) => {
        let user = req.session.get("user");

        if (!user) {

            user = {
                connected : false
            }

            return { props: { user} };
        }

        return {
            props: { user }
        };
    },
    {
        cookieName: "Showroom",
        cookieOptions: {
            secure: process.env.NODE_ENV === "production" ? true : false
        },
        password: process.env.APPLICATION_SECRET
    }
);
