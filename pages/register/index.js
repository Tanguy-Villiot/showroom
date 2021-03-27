import Register from "../../Component/security/register/controler";
import {router} from "next/client";

export default function Index(){

    return <Register router={router}/>

}