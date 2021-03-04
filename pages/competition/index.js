import {useEffect, useState} from "react";
import {initFirebase} from "../../Component/firebase/firebase-utils";
import styles from '../../styles/competition.module.css';
import Image from 'next/image'
import UploadImage from "../../Component/competition/uploadImage";
import {MDBBtn} from "mdbreact";
import {Button} from "react-bootstrap";

let firebase = initFirebase();

export default function Competition({data})
{

    const [images, setImages] = useState(data);
    const [refresh, setRefresh] = useState(true);
    const [count, setCount] = useState(0);


    const handleClickReload = async () => {

        const res = await fetch(`http://localhost:3000/api/creation/getCreation`)
        const x = await res.json()

        setImages(x);

    }

    useEffect(() =>{


        if(refresh)
        {

            setRefresh(false);
        }



        },
        [images],
    );



    return(
        <div className="container-md mt-5">
            <div className="mb-5">
                <UploadImage/>

                <Button variant="warning" className={styles.refreshButton} onClick={handleClickReload}>Refresh</Button>
            </div>


            <div className={styles.imagesContainer}>

            {typeof(images) !== "undefined" &&
            images.map(function (item, i) {
                return (
                        <div key={i} data-src={item.name} style={{ position: 'relative', width: '100%', height: '301px', marginBottom: '1em' }}>
                            <Image
                                alt={i}
                                src={item.name}
                                sizes="(max-width: 600px) 100vw, (max-width: 1023px) 48vw, 23vw"                                objectFit="cover"
                                layout="fill"
                                quality={75}
                                className={styles.item_image}
                                loading="lazy"
                            />
                        </div>
                );
            })
            }

            </div>
        </div>
    )
}


export async function getServerSideProps()
{


    const res = await fetch(`http://localhost:3000/api/creation/getCreation`)
    const data = await res.json()


    return { props : {data} }
}

