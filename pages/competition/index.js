import {Button} from "react-bootstrap";

export default function Competition(){


    return (
        <div>
            <div className="text-center">
                <Button className="mr-2" variant="primary">Vote</Button>
                <Button className="mr-2" variant="secondary" active>Submit</Button>
                <Button className="mr-2" variant="success">Results</Button>
            </div>
        </div>

    )

    
}