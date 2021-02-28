import {Button, Modal, Nav, Navbar, NavDropdown} from "react-bootstrap";
import Link from 'next/link'
import {useRef, useState} from "react";
import {MDBBtn} from "mdbreact";
import {useRouter} from "next/router";

export default function NavBar(){

    const router = useRouter();
    const emailInput = useRef();
    const passwordInput = useRef();

    const [modalShow, setModalShow] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = emailInput.current.value;
        const password = passwordInput.current.value;

        const response = await fetch("../api/auth/sessions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            setModalShow(false);
            return router.push("/private");
        }
    };

    //Effect method
    const handleClickConnection = () =>{
        setModalShow(true);
    }


    return(
        <div>
            <Navbar>
                <Link href="/">
                    <Navbar.Brand href="#home">Showroom</Navbar.Brand>
                </Link>
                <Navbar.Toggle />
                <Nav className="mr-auto">
                    <Link href="/">
                        <Nav.Link href="#home">Home</Nav.Link>
                    </Link>
                    <Link href="/competition">
                        <Nav.Link href="#link">Competition</Nav.Link>
                    </Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Link href="/register">
                        <Nav.Link href="#home">Register</Nav.Link>
                    </Link>
                    /
                    <Nav.Link onClick={handleClickConnection}>Connection</Nav.Link>
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
    )


}

