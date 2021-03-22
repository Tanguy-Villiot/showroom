import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdbreact";
import {useContext, useState} from "react";
import {Button, Form, InputGroup} from "react-bootstrap";
import ToastifyContext from "../../Component/toastify/context";
import checkUser from "../../Component/competition/security/security-utils";
import {router} from "next/client";

export default function Page(){

    const toastify = useContext(ToastifyContext);


    const [validated, setValidated] = useState(false);

    const [value, setValue] = useState({
        name: "",
        surname: "",
        pseudo: "",
        email: "",
        psdw: "",
        confirmpswd: ""
    })


    //Effects methods
    function handleChange(evt) {
        const val = evt.target.value;
        setValue({
            ...value,
            [evt.target.name]: val
        });

    }

    async function handleSubmit (e) {

        e.preventDefault();


        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        else
        {
            setValidated(true);

            if(value.psdw === value.confirmpswd)
            {

                console.log("send");

                console.log(value);

                const res = await fetch('http://localhost:3000/api/auth/register', {

                    method: 'post',

                    body:JSON.stringify({ value })

                })

                if (res.ok) {
                    console.log(res.status);

                    const email = value.email;
                    const password = value.psdw;


                    const response = await fetch("../api/auth/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password })
                    });

                    if (response.ok) {
                        console.log(response.status);


                        toastify.Information(`Bonjour ${value.name}!`);

                        return router.push("/profil");
                    }


                }

            }
            else
            {
                toastify.Warning("Passwords do not match");

            }




        }


        setValidated(true);



    }

    return(
        <div>
            <MDBContainer className="mt-5">
                <MDBRow>
                    <MDBCol md="6" className="m-auto">
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <p className="h4 text-center mb-4">Sign up</p>

                            <MDBRow>
                                <MDBCol>
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="name"
                                        placeholder="First name"
                                        value={value.name}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <br />
                                </MDBCol>
                                <MDBCol>
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="surname"
                                        placeholder="First name"
                                        value={value.surname}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <br />
                                </MDBCol>

                            </MDBRow>

                            <Form.Label>Pseudo</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="pseudo"
                                placeholder="Pseudo"
                                value={value.pseudo}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <br />


                            <Form.Label>Email</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="michel.delacompta@gmail.com"
                                    aria-describedby="inputGroupPrepend"
                                    value={value.email}
                                    onChange={handleChange}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid email.
                                </Form.Control.Feedback>
                            </InputGroup>
                            <br />

                            <MDBRow>
                                <MDBCol>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        name="psdw"
                                        value={value.psdw}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <br />
                                </MDBCol>
                                <MDBCol>
                                    <Form.Label>Confirm your password</Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        name="confirmpswd"
                                        value={value.confirmpswd}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <br />
                                </MDBCol>

                            </MDBRow>

                            <Form.Group>
                                <Form.Check
                                    required
                                    label="Agree to CGU"
                                    feedback="You must agree before submitting."
                                />
                            </Form.Group>

                            <div className="text-center mt-4">
                                <Button type="submit">Submit form</Button>
                            </div>
                        </Form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )

}