/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */

import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {Button, Form, InputGroup} from "react-bootstrap";

export default function View({form}){

    return (
        <div>
            <MDBContainer className="mt-5">
                <MDBRow>
                    <MDBCol md="6" className="m-auto">
                        <Form noValidate validated={form.validated} onSubmit={form.handleSubmit}>
                            <p className="h4 text-center mb-4">Sign up</p>

                            <MDBRow>
                                <MDBCol>
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="name"
                                        placeholder="First name"
                                        value={form.value.name}
                                        onChange={form.handleChange}
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
                                        value={form.value.surname}
                                        onChange={form.handleChange}
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
                                value={form.value.pseudo}
                                onChange={form.handleChange}
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
                                    value={form.value.email}
                                    onChange={form.handleChange}
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
                                        value={form.value.psdw}
                                        onChange={form.handleChange}
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
                                        value={form.value.confirmpswd}
                                        onChange={form.handleChange}
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
                                <Form.Control.Feedback type="invalid">
                                    You must accept the CGU to sign-up
                                </Form.Control.Feedback>
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