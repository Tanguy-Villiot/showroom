import {Button} from "react-bootstrap";
import styles from '../../styles/competition.module.css';
import {useState} from "react";


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

        return <Component />
    }

    return (
        <div>
            <div className="text-center">
                <Button name="Vote" className="mr-2" variant="primary" onClick={handleClick}>Vote</Button>
                <Button name="Submit" className="mr-2" variant="secondary" active onClick={handleClick}>Submit</Button>
                <Button name="Results" className="mr-2" variant="success" onClick={handleClick}>Results</Button>
            </div>
            <div className={styles.container}>
                <Container />

            </div>
        </div>

    )

    
}