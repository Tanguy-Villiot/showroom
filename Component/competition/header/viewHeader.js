/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */

import styles from "./viewHeader.module.css";
import Head from "next/head";

export default function ViewHeader({competition}){


    return (

        <>

            <Head>
                <title>Showroom - Competition</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>


            <div className="container-md mt-5">

                <div className={styles.titleContainer}>

                    <img src="Competition/Design.png" className={styles.titleContainer_image} alt="image" />

                    <div className={styles.titleContainer_text}>
                        <h1 className={styles.title}>{competition.theme}</h1>
                        <h5 className={styles.subtitle}>"{competition.history}"</h5>

                    </div>



                </div>
            </div>

        </>


    )


}