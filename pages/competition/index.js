import {Button} from "react-bootstrap";
import styles from '../../styles/competition.module.css';
import {useEffect, useState} from "react";
import {AiOutlineLoading3Quarters} from "react-icons/ai";

function Competition({ data }){

    const[count, setCount] = useState(0);
    const[refreshImage, setRefreshImage] = useState(true);
    const[images, setImages] = useState({})

    let consoleLogActive = true;
    const consoleLog = (message, active) =>{

        if(active || consoleLogActive)
        {
            console.log(message);
        }

    }


    let getImages = function (list) {

        return new Promise(function (resolve, reject) {

            let x = [];

            for(let i = 0; i <= 9; i++)
            {
                let item = list[Math.floor(Math.random() * list.length)];

                x.push(item);

            }

            if(x.length === 10)
            {
                resolve(x)
            }
            else
            {
                reject("List not contains 10 images");
            }

        })
    }


    //EFFECTS METHODS

    const handleClickReload = () =>{

        setRefreshImage(true);
        setCount(count + 1);

    }



    useEffect(
        () => {


            if(refreshImage)
            {

                setRefreshImage(false);

                getImages(data)
                    .then(function (res){

                        setImages(res);

                        consoleLog(res);

                    }).catch(function (res){

                });

                console.log(images);

            }

            consoleLog(data);

        },
        [data, count],
    );



    //VIEW METHODS

    const CreateTable = () => {


        return <>

            {!Array.isArray(images) ?
                <h2>Loading ...</h2>
                :
                images.map(function(item, i){
                    return <div key={i} className={styles.item}>
                        <img src={item.download_url} className={styles.item_image}/>
                    </div>


                })
            }

        </>;



    }


    return (
        <div>
            <div className="container-md mt-5">

                <div className={styles.Container}>
                    <div className={styles.actionBar}>

                        <div className={styles.actionBar_alignleft}>
                            <h2>Vote pour tes créations favorites</h2>
                        </div>

                        <div className={styles.actionBar_alignright}>
                            <div className={styles.actionBar_reload} onClick={handleClickReload}>
                                <AiOutlineLoading3Quarters size={32}/>
                            </div>
                        </div>

                    </div>
                    <div className={styles.imagesContainer}>
                        <CreateTable />
                    </div>
                    <div className={styles.voteContainer}>
                        {/*<img className={styles.voteImage} src="https://via.placeholder.com/125"/>*/}
                        {/*<img className={styles.voteImage} src="https://via.placeholder.com/125"/>*/}
                        {/*<img className={styles.voteImage} src="https://via.placeholder.com/125"/>*/}
                        <Button name="Vote" className="mr-2" variant="primary">Submit</Button>
                    </div>
                </div>

            </div>
        </div>

    )

    
}

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`https://picsum.photos/v2/list?page=1&limit=100`)
    const data = await res.json()

    // Pass data to the page via props
    return { props: { data } }
}

export default Competition;