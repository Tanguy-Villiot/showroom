/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */
import styles from './footer.module.css'
import {MDBProgress} from "mdbreact";


export default function Footer()
{
    return(
        <div className={styles.footer}>

            <div className={styles.progessBar}>

                <div className={styles.creation}>
                    <MDBProgress value={100} className={styles.bar + " my-2"} color="success">
                        Création
                    </MDBProgress>
                </div>

                <div className={styles.vote}>
                    <MDBProgress value={20} className={styles.bar + " my-2"} color="info">
                        Vote
                    </MDBProgress>

                </div>

                <div className={styles.reveal}>
                    <MDBProgress value={0} className={styles.bar + " my-2"} color="danger">
                        Reveal
                    </MDBProgress>
                </div>


            </div>

        </div>
    )
}