import styles from './navbar.module.css'


import {Button, Dropdown, DropdownButton, Modal, Nav, Navbar, NavDropdown} from "react-bootstrap";
import Link from 'next/link'
import {useContext, useEffect, useRef, useState} from "react";
import {MDBBtn} from "mdbreact";
import ToastifyContext from "../toastify/context";
import checkUser from "../competition/security/security-utils";
import {useCurrentUser} from "../security/user/userContext";
import {useRouter} from "next/router";

export default function NavBar(){

    const router = useRouter();
    const emailInput = useRef();
    const passwordInput = useRef();

    const [modalShow, setModalShow] = useState(false);
    const { currentUser, fetchCurrentUser } = useCurrentUser();
    const [changeConnection, setChangeConnection] = useState(0);


    const toastify = useContext(ToastifyContext);

    //Connection
    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = emailInput.current.value;
        const password = passwordInput.current.value;



        const response = await fetch("../api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            console.log(response.status);
            setModalShow(false);

            fetchCurrentUser();

            toastify.Information("Bonjour !");
            return router.push("/profil");
        }
        else
        {
           if(response.status === 404)
           {
               console.log("Email or password wrong");
           }

        }
    };

    //Effect method
    const handleClickConnection = () =>{
        setModalShow(true);
    }

    const handleClickLogout = async (e) => {

        e.preventDefault();

        const response = await fetch("../api/auth/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            fetchCurrentUser()

            toastify.Information("You have been logout");
            return router.push("/");
        }


    };



    useEffect(() => fetchCurrentUser(), [])


    //VIEW METHODS

    const ButtonUser = () => {

        if (!currentUser.connected) {

            return(
                <>
                    <Link href="/register">
                        <Nav.Link href="#home" className={styles.link}>Register</Nav.Link>
                    </Link>

                    <Nav.Link onClick={handleClickConnection} className={styles.link}>Connection</Nav.Link>
                 </>
            )


        } else {
            return(
                <>
                    <DropdownButton
                        menuAlign={{ lg: 'right' }}
                        title={"Bonjour " + currentUser.user.name}
                        id="dropdown-menu-align-right"
                    >

                        <Link href="/profil">Profil</Link>

                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleClickLogout}>Logout</Dropdown.Item>
                    </DropdownButton>

                </>
            )
        }


    }

    return(
        <div className={styles.navbarShowroom + " container fixed-top"} style={{ maxWidth: 1700 }}>

            <div>
                <Navbar>
                    <Link href="/">
                        <Navbar.Brand href="#home" className={styles.link}>Showroom</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle />
                    <Nav className="mr-auto white-text">
                        <Link href="/">
                            <Nav.Link href="#home" className={styles.link}>Home</Nav.Link>
                        </Link>
                        <Link href="/competition">
                            <Nav.Link href="#link" className={styles.link}>Competition</Nav.Link>
                        </Link>
                        <Link href="/reveal">
                            <Nav.Link href="#link" className={styles.link}>Reveal</Nav.Link>
                        </Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">

                        <ButtonUser/>
                        
                    </Navbar.Collapse>
                </Navbar>

                {/*Sign in modal*/}
                <Modal show={modalShow} onHide={() => setModalShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Sign in
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                Your email
                            </label>
                            <input type="email" id="defaultFormLoginEmailEx" className="form-control" ref={emailInput}/>
                            <br />
                            <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                                Your password
                            </label>
                            <input type="password" id="defaultFormLoginPasswordEx" className="form-control" ref={passwordInput}/>
                            <div className="text-center mt-4">
                                <MDBBtn color="primary" type="submit">Login</MDBBtn>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>

        </div>

    )


}
