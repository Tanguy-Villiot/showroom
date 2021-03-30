import styles from "./homepage.module.css";

export default function View(){


    return (

        <>
            <img src='homepage/homepage.jpg' className={styles.Banniere} alt=""/>

            <img src='homepage/svg-path.svg' className={styles.SVG} alt=""/>


            <div className="container-lg">

                <div className={styles.MonthCompetition + " container"}>

                    <div className="row">

                        <div className="col-sm overflow-hidden">

                            <img src='homepage/renderman.gif' className={styles.MonthCompetition_ill} alt=""/>

                        </div>

                        <div className="col-sm">

                            <h1 className={styles.MonthCompetition_text}>Participer au concours du mois, <br/>
                                sur l'univers<br/> <span style={{color: "#7a5995"}}> Jeux Vidéo</span></h1>

                            <p className={styles.MonthCompetition_subtext}>"Le jeu vidéo de votre enfance"</p>

                            <button className={styles.MonthCompetition_button}>Participer</button>

                        </div>

                    </div>

                </div>

                <div className={styles.HowWork}>

                    <h1 className={styles.HowWork_title + " text-center text-uppercase mb-5"}>Comment ça marche ?</h1>

                    <div className="row">

                        <div className="col-sm">

                            <div className={styles.HowWork_step}>

                                <div className={styles.HowWork_step_circle}>

                                    <h1 className={styles.HowWork_step_circle_nbr}>1</h1>

                                    <p className={styles.HowWork_step_circle_text}><span style={{color: "#7a5995"}}>Créer</span> une illustration selon le thème du mois, et partagez là !</p>

                                </div>


                            </div>


                        </div>

                        <div className="col-sm">

                            <img src='homepage/renderman.gif' className={styles.MonthCompetition_ill} alt=""/>


                        </div>

                    </div>

                    <div className="row">

                        <div className="col-sm">

                            <button className={styles.HowWork_button}>Découvrir plus en détail</button>

                        </div>

                    </div>

                </div>

                <div className={styles.FAQ}>

                    <div className={styles.FAQ_container}>
                        <div className="row">

                            <div className="col-sm">


                            </div>

                            <div className="col-sm">

                                <h2 className={styles.FAQ_title}>Ne restez jamais avec des questions sans réponses</h2>

                                <p className={styles.FAQ_link}>Consulter la FAQ</p>

                            </div>

                        </div>
                    </div>

                </div>

                <div className={styles.Button}>

                    <p className={styles.Button_title + " text-center"}>Ne vous embêter pas à remonter en haut de la page</p>

                    <p className={styles.Button_subtitle + " text-center"}>On emmène le bouton à vous !</p>

                    <div className="text-center">
                        <button className={styles.MonthCompetition_button}>Participer</button>

                    </div>


                </div>

            </div>



        </>



    )


}