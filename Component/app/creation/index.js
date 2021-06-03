/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */
import global from '../app.module.css'
import styles from './creation.module.css'
import {useContext} from "react";
import CompetitionContext from "../../competition/competitionContext";
import ToastifyContext from "../../toastify/context";
import ModalImport from "./modalImport";

export default function Homepage(props)
{

    const {competition} = useContext(CompetitionContext)
    const toastify = useContext(ToastifyContext);

    console.log(props)

    function handleImportImage(Image)
    {
        console.log(Image)

        props.handleImageImporte(Image);
    }

    return (
        <div className={global.page}>


            <div className={styles.contest}>


                <div className={styles.contestImageContainer}>

                        <img className={styles.contestImage} src="/homepage/wireframe.gif" alt="panneaux" />

                </div>


                <div className={styles.contestInformation}>

                    <div className={global.titleContainer}>
                        <h1 className={global.Title}>Bienvenue, envie de montrer vos talents ?</h1>
                        <p className={styles.contestText}>N'importe qui peut participer, alors pourquoi pas vous ?</p>
                    </div>




                    <div className={styles.contestButtons}>


                        <ModalImport competition={competition} toastify={toastify} fileImport={(Image) => handleImportImage(Image)}/>


                        <div className={styles.contestButtonCheck}>

                            <p className={styles.contestButtonCheckText}>En savoir plus</p>


                        </div>



                    </div>

                </div>



            </div>


        </div>
    )

}
