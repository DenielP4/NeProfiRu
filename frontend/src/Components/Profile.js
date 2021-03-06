import React, {useEffect, useState} from "react";
import axios from "axios";
import avatar from "../Assets/userProfile.png"
import {
    Button, Card,
    Col,
    Container,
    Form,
    FormControl, Image,
    InputGroup,
    Modal,
    Row, Spinner, Stack
} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import validator from "validator";
import UpdateUserInfo from "./UpdateUserInfo";
import UpdateTeacherInfo from "./UpdateTeacherInfo";
import "../css/text.css";

const UserProfile = () => {
    const [user, setUser] = useState("");
    const [teacher, setTeacher] = useState({});
    const [modalShow, setModalShow] = React.useState(false);
    const [modalTeacherShow, setModalTeacherShow] = React.useState(false);
    const [ loading, setLoading] = useState(true)
    const [isTeacher, setIsTeacher] = useState(false)
    const navigate = useNavigate();
    const getUser = async () => {
        console.log("dasdsadasd");
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            console.log("dasdsadasd");
            await axios.get("http://localhost:8080/api/user/info",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                console.log(response.data);
                setUser(response.data.userInfo);
                setIsTeacher(response.data.roles.length > 1);
                setLoading(false)
            })
        } catch (err) {
            console.log("dasdsadasd");
            console.error(err.message);
        }
    };
    const getTeacher = async () => {
        console.log("dasdsadasd");
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            console.log("dasdsadasd");
            await axios.get("http://localhost:8080/api/teacher/info",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                console.log(response.data);
                setTeacher(response.data);
                setLoading(false)
            })
        } catch (err) {
            console.log("dasdsadasd");
            console.error(err.message);
        }
    };
    useEffect(() => {
        getUser();
        getTeacher();
    }, []);
    return(
        <Container style={{backgroundColor:'rgba(135,158,240,0.57)', padding:20, borderRadius:10}} className="mb-3 mt-3">
            <Row  className="mb-3 mt-3">
                {isTeacher &&
                    <Col>
                        <Card style={{backgroundColor:'#eed39b', boxShadow: " 3px 3px 3px #1d1818"}} className="d-flex flex-column align-items-center login">
                            <h1 className="text-center">???????????????? ??????????????</h1>
                            {loading ? <Spinner animation="border" style={{width: '300', height: '300'}}/> :
                                <Image src={teacher.img} roundedCircle width={400} height={300}/>}
                            <Card.Body>
                                <Stack gap={1}>
                                    <Row className="mb-2">
                                        <Form.Label className="editTextTeacher">???????????????? ???????????????????? ?????????????? ??????????????????</Form.Label>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Check
                                                label="????????"
                                                checked={teacher.learnInHome}
                                                disabled
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Check
                                                label="?? ??????????????"
                                                checked={teacher.learnInStudent}
                                                disabled
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Check
                                                label="????????????????"
                                                checked={teacher.remote}
                                                disabled
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-2">
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label className="editTextTeacher">??????????????????????</Form.Label>
                                            <Form.Control type="text"
                                                          placeholder="???????????????? ????????????????"
                                                          value={teacher.subject}
                                                          disabled/>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-2">
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label className="editTextTeacher">?????????????????? ?????????????? ???? ??????</Form.Label>
                                            <Form.Control type="number"
                                                          placeholder="?????????????? ???????? ?? ????????????"
                                                          value={teacher.price}
                                                          disabled/>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-2">
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label className="editTextTeacher">?????? ??????????????????????</Form.Label>
                                            <Form.Control type="text" as="textarea"
                                                          placeholder="?????????????? ???????? ??????????????????????"
                                                          rows="3"
                                                          value={teacher.education}
                                                          disabled/>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-2">
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label className="editTextTeacher">?? ????????</Form.Label>
                                            <Form.Control type="text" as="textarea"
                                                          placeholder="?????????????? ???????????????????? ?? ????????"
                                                          rows="5"
                                                          value={teacher.aboutTeacher}
                                                          disabled/>
                                        </Form.Group>
                                    </Row>
                                    <Button variant="dark" className="justify-content-center"
                                            onClick={() => setModalTeacherShow(true)}>??????????????????????????</Button>
                                </Stack>
                                <UpdateTeacherInfo
                                    show={modalTeacherShow}
                                    onHide={() => {getTeacher(); setModalTeacherShow(false)}}/>
                            </Card.Body>
                        </Card>
                    </Col>
                }
                <Col>
                    <Row>
                    <Card style={{backgroundColor:'rgba(50,84,232,0.57)', padding:40, borderRadius:10}} className="d-flex flex-column align-items-center login">
                        <Row>
                            <h1 style={{color:'#fff', fontWeight:"bold"}} className="text-center">???????????????????? ?? ????????????????????????</h1>
                            <Col>
                                <Form.Label className="editText" htmlFor="basic-url">??????</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl id="basic-url" aria-describedby="basic-addon3" placeholder="???????? ??????" value = {user.firstName} disabled/>
                                </InputGroup>
                                <Form.Label className="editText" htmlFor="basic-url2">??????????????????</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl id="basic-url2" aria-describedby="basic-addon3" placeholder="???????? ????????????????" value = {user.middleName} disabled/>
                                </InputGroup>
                                <Form.Label className="editText" htmlFor="basic-url2">??????????????</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl id="basic-url2" aria-describedby="basic-addon3" placeholder="?????? ??????????????" value = {user.age} disabled/>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Form.Label className="editText" htmlFor="basic-url">??????????????</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl id="basic-url" aria-describedby="basic-addon3" placeholder="???????? ??????????????" value = {user.lastName} disabled/>
                                </InputGroup>
                                <Form.Label className="editText" htmlFor="basic-url4">?????????? ????????????????????</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl id="basic-url4" aria-describedby="basic-addon3" placeholder="?????? ??????????" value = {user.town} disabled/>
                                </InputGroup>
                                <Form.Label className="editText" htmlFor="basic-url2">?????????? ????????????????</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl id="basic-url2" aria-describedby="basic-addon3" placeholder="?????? ?????????? ????????????????" value = {user.phone} disabled/>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Form.Label className="editText" style={{fontSize:20}}>???????????????? ???????????????? ?????????? ?? ????????</Form.Label>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Check
                                    className="editText"
                                    label="telegram"
                                    checked={user.telegram}
                                    disabled
                                     />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Check
                                    className="editText"
                                    label="whatsApp"
                                     checked={user.whatsApp}
                                    disabled
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Check
                                    className="editText"
                                    label="viber"
                                    checked={user.viber}
                                    disabled
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Button variant="dark" className="justify-content-center" onClick={() => setModalShow(true)}>??????????????????????????</Button>
                        </Row>
                        <UpdateUserInfo
                            show={modalShow}
                            onHide={() => {getUser(); setModalShow(false)}}/>
                    </Card>
                    </Row>
                    {isTeacher &&
                        <Row>
                            <Card className="d-flex flex-column align-items-center login mt-4">
                                <Row>
                                    <h1 className="text-center">???????? ???????????????? ???? ???????????????????? ??????????????</h1>
                                </Row>
                            </Card>
                        </Row>
                    }
                    {!isTeacher &&
                        <Row>
                            <Card style={{backgroundColor:'rgba(135,158,240,0.57)', padding:40, borderRadius:10}} className="d-flex flex-column align-items-center login mt-4">
                                <Row>
                                    <h1 style={{color:'#fff', fontWeight:"bold"}} className="text-center">???????? ??????????????</h1>
                                </Row>
                            </Card>
                        </Row>
                    }
                </Col>
            </Row>
        </Container>
    )
}
export default UserProfile;