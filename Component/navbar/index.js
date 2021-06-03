import styles from './navbar.module.css'

import {Dropdown, Modal, Nav, Navbar} from "react-bootstrap";
import Link from 'next/link'
import {forwardRef, useContext, useEffect, useRef, useState} from "react";
import {MDBBtn} from "mdbreact";
import ToastifyContext from "../toastify/context";
import {useCurrentUser} from "../security/user/userContext";
import {useRouter} from "next/router";

export default function NavBar(){

    const router = useRouter();

    const [navbarShow, setNavbarShow] = useState(false);
    const { currentUser, fetchCurrentUser } = useCurrentUser();
    const [changeConnection, setChangeConnection] = useState(0);


    const toastify = useContext(ToastifyContext);


    //Effect method

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

    function handleHover(){
        setNavbarShow(true);
    }

    function handleHide(){
        // setNavbarShow(false);
    }



    useEffect(() => fetchCurrentUser(), [router.pathname])


    //VIEW METHODS


    const CustomToggle = forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className={styles.linkProfil}
        >
            <img className={styles.thumbnailImage}
                 src="/Profil/1.png"
                 alt="user pic"
            />

            {children}

            <img className={styles.arrowdown}
                 src="/down-arrow.svg"
                 alt="user pic"
            />
            {/*&#x25bc;*/}
        </a>
    ));

    const ButtonUser = () => {

        if (!currentUser.connected) {

            return(
                <>
                    <Link href="/register">
                        <Nav.Link href="#home" className={styles.link}>Register</Nav.Link>
                    </Link>

                    <Link href="/login">
                        <Nav.Link href="/login" className={styles.link}>Connection</Nav.Link>
                    </Link>
                 </>
            )


        } else {
            return(
                <>
                    <Dropdown className={styles.DropDown} show={navbarShow} onMouseEnter={handleHover} onMouseLeave={handleHide}>
                        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                            {currentUser.user.name}
                        </Dropdown.Toggle>


                        <Dropdown.Menu className={styles.dropdownMenu}>

                            <div className={styles.dropdownContainer}>
                                <Dropdown.Item><Link href="/profil"><a href="/profil">Profil</a></Link></Dropdown.Item>

                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleClickLogout}>Faq</Dropdown.Item>

                                <Dropdown.Item onClick={handleClickLogout}>Logout</Dropdown.Item>
                            </div>


                        </Dropdown.Menu>

                    </Dropdown>

                </>
            )
        }


    }


    const classes = router.pathname === "/" ?
        `${styles.navbarShowroomHome} fixed-top` :
        `${styles.navbarShowroomOther}`

    return(

        <>

            {router.pathname === "/register" ?

                <>
                </>

                :

                <>

                    {router.pathname === "/login" ?

                        <>

                        </>

                        :

                        <div className={classes}>

                            <div>
                                <Navbar>
                                    <Link href="/">
                                        <Navbar.Brand href="#home" className={styles.link} style={{marginRight: "1em", paddingTop: "0.125rem", fontFamily: "Inter-Bold"}}>Showroom</Navbar.Brand>
                                    </Link>
                                    <Navbar.Toggle />
                                    <Nav className="mr-auto white-text">
                                        <Link href="/">
                                            <Nav.Link href="/" className={styles.link}>Home</Nav.Link>
                                        </Link>
                                        <Link href="/competition">
                                            <Nav.Link href="/competition" className={styles.link}>Competition</Nav.Link>
                                        </Link>
                                        <Link href="/reveal">
                                            <Nav.Link href="/reveal" className={styles.link}>Reveal</Nav.Link>
                                        </Link>
                                    </Nav>
                                    <Navbar.Collapse className="justify-content-end">

                                        <ButtonUser/>

                                    </Navbar.Collapse>
                                </Navbar>

                            </div>

                        </div>

                    }


                </>

                

            }


        </>

    )


}
