import styles from "../../../styles/competition.module.css";
import Image from "next/image";
import {Button} from "react-bootstrap";
import UploadImage from "../uploadImage";
import Head from 'next/head'



export default function View({images, handleClickReload, handleClickVote, imageVote}) {

    return (
        <>
            <Head>
                <title>Showroom - Competition</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <div className="container-md mt-5">
                <div className="mb-5">
                    <UploadImage/>

                    <Button variant="warning" className={styles.refreshButton} onClick={handleClickReload}>Refresh</Button>
                </div>




                <div className={styles.imagesContainer}>

                    {typeof(images) !== "undefined" &&
                    images.map(function (item, i) {
                        return (
                            <div key={i} data-src={item.url} onClick={handleClickVote} style={{marginBottom: '1em' }}>
                                {/*<Image*/}
                                {/*    alt={item._id}*/}
                                {/*    src={item.url}*/}
                                {/*    sizes="(max-width: 600px) 100vw, (max-width: 1023px) 48vw, 23vw"                                objectFit="cover"*/}
                                {/*    layout="fill"*/}
                                {/*    quality={75}*/}
                                {/*    className={styles.item_image}*/}
                                {/*    loading="lazy"*/}
                                {/*/>*/}


                                <img src={item.url} className={styles.item_image} key={i} alt={item._id}/>

                            </div>
                        );
                    })
                    }


                </div>

                {/*<div className={styles.voteContainer}>*/}

                {/*    <div data-src={imageVote.url} onClick={handleClickVote} style={{ position: 'relative', width: '100%', height: '301px', marginBottom: '1em' }}>*/}
                {/*        <Image*/}
                {/*            alt={imageVote.id}*/}
                {/*            src={imageVote.url}*/}
                {/*            sizes="(max-width: 600px) 100vw, (max-width: 1023px) 48vw, 23vw"                                objectFit="cover"*/}
                {/*            layout="fill"*/}
                {/*            quality={1}*/}
                {/*            className={styles.voteImage}*/}
                {/*            loading="lazy"*/}
                {/*        />*/}
                {/*    </div>*/}


                {/*</div>*/}

            </div>
        </>
    )


}