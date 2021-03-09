import React from "react";
import { withIronSession } from "next-iron-session";
import {useRouter} from "next/router";

export default function Page({user}){

    const router = useRouter()


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("../api/auth/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            return router.push("/");
        }

    };

    return(
        <div>
            <h1>Hello {user.name}</h1>
            <p>Secret things live here...</p>


            <form onSubmit={handleSubmit}>

                <button type="submit">Sign in</button>
            </form>

        </div>

    )
}

export const getServerSideProps = withIronSession(
    async ({ req, res }) => {
        const user = req.session.get("user");


        if (!user) {
            return { props: {} };
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
