/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {format} from "date-fns";
import styles from './profil.module.css'
import {Accordion, Card, Button} from "react-bootstrap";

export default function View({user, userCreation}){


    return(

        <div className="container-md mt-5">
            <h1>{user.name} {user.surname} <span className="text-muted">({user.pseudo})</span> </h1>

            <div className="d-inline">
                <div className="mb-3 mt-5">
                    <FontAwesomeIcon icon={faEnvelope} className={styles.Icon} style={{color: '#ffd600'}}/>{user.email}
                </div>
                <div className="mb-3">
                    <FontAwesomeIcon icon={faSignInAlt} className={styles.Icon} style={{color: '#0090ff'}}/>registered since {format(new Date(user.register), 'dd/MM/yyy')}
                </div>
            </div>

            <Accordion className="mt-5">
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Your creations
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>Hello! I'm another body</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>

        </div>
    )
}