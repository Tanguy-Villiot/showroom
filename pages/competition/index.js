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


    //EFFECTS METHODS

    const handleClickReload = async () => {

        const dev = process.env.NODE_ENV !== 'production';

        const server = dev ? 'http://localhost:3000' : 'https://showroom-fawn.vercel.app';

        const res = await fetch(`${server}/api/creation/getCreation`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json()

        setImages(data);

    }


    const handleClickVote = async (e) => {


        console.log(e.target.alt);

        const res = await fetch('http://localhost:3000/api/creation/voteCreation', {

            method: 'post',

            body: JSON.stringify(e.target.alt)

        })


    }


    useEffect(() =>{


        console.log(data);

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
                        <div key={i} data-src={item.url} onClick={handleClickVote} style={{ position: 'relative', width: '100%', height: '301px', marginBottom: '1em' }}>
                            <Image
                                alt={item._id}
                                src={item.url}
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

    const dev = process.env.NODE_ENV !== 'production';

    const server = dev ? 'http://localhost:3000' : 'https://showroom-fawn.vercel.app';

    const res = await fetch(`${server}/api/creation/getCreation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    const data = await res.json()

    return { props : { data} }
}

