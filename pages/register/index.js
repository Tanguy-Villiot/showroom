import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdbreact";
import {useState} from "react";

export default function Page(){

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

        console.log(value);
    }

    function handleSumbit(e) {

        e.preventDefault();
        console.log(value);
    }

    return(
        <div>
            <MDBContainer className="mt-5">
                <MDBRow>
                    <MDBCol md="6" className="m-auto">
                        <form>
                            <p className="h4 text-center mb-4">Sign up</p>

                            <MDBRow>
                                <MDBCol>
                                    <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                                        Your name
                                    </label>
                                    <input name="name" type="text" id="defaultFormRegisterNameEx" className="form-control" value={value.name} onChange={handleChange}/>
                                    <br />
                                </MDBCol>
                                <MDBCol>
                                    <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                                        Your surname
                                    </label>
                                    <input name="surname" type="text" id="defaultFormRegisterNameEx" className="form-control" value={value.surname} onChange={handleChange}/>
                                    <br />
                                </MDBCol>

                            </MDBRow>

                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                                Your pseudo
                            </label>
                            <input name="pseudo" type="text" id="defaultFormRegisterNameEx" className="form-control" value={value.pseudo} onChange={handleChange}/>
                            <br />
                            <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                                Your email
                            </label>
                            <input name="email" type="email" id="defaultFormRegisterEmailEx" className="form-control" value={value.email} onChange={handleChange}/>
                            <br />

                            <MDBRow>
                                <MDBCol>
                                    <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
                                        your password
                                    </label>
                                    <input name="psdw" type="password" id="defaultFormRegisterConfirmEx" className="form-control" value={value.psdw} onChange={handleChange}/>
                                    <br />
                                </MDBCol>
                                <MDBCol>
                                    <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                                        Confirm your password
                                    </label>
                                    <input name="confirmpswd" type="password" id="defaultFormRegisterPasswordEx" className="form-control" value={value.confirmpswd} onChange={handleChange} />
                                </MDBCol>
                            </MDBRow>

                            <div className="text-center mt-4">
                                <MDBBtn color="primary" type="submit" onClick={handleSumbit}>
                                    Register
                                </MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )

}