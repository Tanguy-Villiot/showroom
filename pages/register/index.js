import Register from "../../Component/security/register/controler";
import {useRouter} from "next/router";

export default function Index(){

    const router = useRouter();

    return <Register router={router}/>

}