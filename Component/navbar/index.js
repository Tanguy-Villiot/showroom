import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import Link from 'next/link'

export default function NavBar(){


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
                </Navbar.Collapse>
            </Navbar>
        </div>
    )


}

