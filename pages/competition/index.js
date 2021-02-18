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

    const Container = () =>{

        let Comp = Submit;

        switch (Component)
        {
            case "Submit":
                Comp = Submit;
                break;
            case "Vote":
                Comp = Vote;
                break;
            case "Results":
                Comp = Results;
                break;
            default:
                Comp = Submit;
                break;

        }

        return <Comp />;

    }


    return (
        <div>
            <div className="text-center">
                <Button name="Vote" className="mr-2" variant="primary" onClick={handleClick}>Vote</Button>
                <Button name="Submit" className="mr-2" variant="secondary" active onClick={handleClick}>Submit</Button>
                <Button name="Results" className="mr-2" variant="success" onClick={handleClick}>Results</Button>
            </div>
            <div className="container-md mt-5">
                <Container/>

            </div>
        </div>

    )

    
}