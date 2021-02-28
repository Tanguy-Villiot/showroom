import {allUser} from "../../Component/security/controller/security-utils";

export default function Page({users}){

    console.log(users);

    return(
        <h1>Oui</h1>
    )
}

export async function getServerSideProps(){


    let users = await allUser();

    // console.log({users});
    //

    console.log(users);
    //
    // console.log({data});
    //
    //
    return {
        props: {
            users: JSON.parse(JSON.stringify(users))
        }
    }
}