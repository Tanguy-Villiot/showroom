import styles from "./homepage.module.css";
import {useEffect, useState} from "react";


let count = 0;


export default function View({language}){

    const imageList = [
        "homepage.jpg",
        "microsoft.jpg",
        "cyberpunk.jpg"
    ];

    const [image, setImage] = useState(imageList[0]);


    useEffect(() => {


    }, [image])




    function Banner(){


        function isEven(value) {
            if (value%2 === 0)
                return true;
            else
                return false;
        }


        function handleLoadImg(e){


            console.log("iteration");

            if(count === imageList.length -1)
            {
                count = 0;
            }
            else
            {
                count++;
            }

            setImage(imageList[count])


        }



        return(

            <>

                {isEven(count) ?

                    <img src={'homepage/' + image} className={styles.BanniereRight} alt="" onAnimationIteration={handleLoadImg}/>

                    :

                    <img src={'homepage/' + image} className={styles.BanniereLeft} alt="" onAnimationIteration={handleLoadImg}/>

                }


            </>

        );


    }


    return (

        <>

            <div className={styles.Banniere_container}>

                <Banner />
            </div>

            <img src='homepage/svg-path.svg' className={styles.SVG} alt=""/>


            <div className="container-xl">

                <div className={styles.MonthCompetition + " container"}>

                    <div className="row">

                        <div className="col-sm overflow-hidden">

                            <img src='homepage/Illu-AS.gif' className={styles.MonthCompetition_ill} alt=""/>

                        </div>

                        <div className="col-sm">

                            <h1 className={styles.MonthCompetition_text}>{language.Participate.title}<br/><span style={{color: "#7a5995"}}> Jeux Vidéo</span></h1>

                            <p className={styles.MonthCompetition_subtext}>"Le jeu vidéo de votre enfance"</p>

                            <button className={styles.MonthCompetition_button}>{language.Participate.button}</button>

                        </div>

                    </div>

                </div>

                <div className={styles.HowWork}>

                    <h1 className={styles.HowWork_title + " text-center text-uppercase mb-5"}>Comment ça marche ?</h1>

                    <div className="row">

                        <div className="col-sm">

                            <div className={styles.HowWork_step}>

                                <p className={styles.HowWork_step_circle_text}><span style={{color: "#7a5995"}}>Créer</span> une illustration selon le thème du mois, et partagez là !</p>


                                <div className={styles.HowWork_step_circle}>

                                    <h1 className={styles.HowWork_step_circle_nbr}>1</h1>


                                </div>



                            </div>


                        </div>

                        <div className="col-sm">

                            <img src='homepage/Wireframe.png' className={styles.MonthCompetition_ill} alt=""/>


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