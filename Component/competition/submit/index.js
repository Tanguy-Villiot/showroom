import styles from '../../../styles/submit.module.css';

export default function Submit(){


    return <div className={styles.Container}>
        <h1 className="text-center">Send your image</h1>

                <h2 className={styles.title}>Drop file to upload</h2>

                <div className={styles.dropzone}>

                    <img src="https://100dayscss.com/codepen/upload.svg" alt="Dropzone image"/>

                    <input type="file" className="upload-input" />

                </div>

                <button type="button">Upload file</button>

    </div>

}