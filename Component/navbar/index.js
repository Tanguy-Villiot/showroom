import {Nav, Navbar, NavDropdown} from "react-bootstrap";

export default function NavBar(){


    return(
        <div>
            <Navbar>
                <Navbar.Brand href="#home">Showroom</Navbar.Brand>
                <Navbar.Toggle />
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Competition</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Nav.Link href="#home">Connection</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )


}

