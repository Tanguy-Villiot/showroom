import {Button} from "react-bootstrap";
import styles from '../../styles/competition.module.css';
import {useState} from "react";
import Submit from "../../Component/competition/submit";
import Vote from "../../Component/competition/vote";
import Results from "../../Component/competition/results";

export default function Competition(){

    const[Component, setComponent] = useState("Submit");

    let consoleLogActive = true;



    const consoleLog = (message, active) =>{

        if(active || consoleLogActive)
        {
            console.log(message);
        }

    }

    const handleClick = (e) =>{

        consoleLog(e.target.name);

        setComponent(e.target.name);

    }



    return (
        <div>
            <div className="container-md mt-5">
                

            </div>
        </div>

    )

    
}