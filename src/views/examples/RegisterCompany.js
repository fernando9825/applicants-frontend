import React from "react";
import UserHeader from "../../components/Headers/UserHeader";
import {Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Row} from "reactstrap";
import {Session} from "bc-react-session";
import api from "../../utils/API";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import generator from 'generate-password';

class RegisterCompany extends React.Component {
    constructor(props) {
        super(props);

        let { payload } = Session.get();

        this.state = {
            editing: true,
            changePassword: false,
            password: "ProntoBPO",
            editButton: "Edit profile",
            classPwd1: "form-control-alternative",
            classPwd2: "form-control-alternative",
            classField1: "",
            classField2: "",
            plan: [],
            copyToClipBoard: false,
            clipBoardText: undefined
        };

        this.selectedPlan = React.createRef();
        this.name = React.createRef();
        this.email = React.createRef();
    }

    getPlans = (plans) =>{
        if (typeof plans == 'object'){

            let row = [];

            for(let i=0; i<plans.length; i++){
                row.push(<option >{plans[i].name}</option>);
            }

            return row;
        }
    };

    copy = (text) => {
        return(<CopyToClipboard
            text={text}
            onCopy={() => this.setState({ copiedText: text })}
        >
            <Button
                className="btn-icon-clipboard"
                id="tooltip982655500"
                type="button"
            >
                <div>
                    <i className="ni ni-active-40" />
                    <span>Company Created! - Copy to the clipboard</span>
                </div>
            </Button>
        </CopyToClipboard>);
    };




    saveCompany = () => {
        let password = generator.generate({
            length: 10,
            numbers: true
        });


        let nameInput = document.getElementById("input-username");
        let emailInput = document.getElementById("input-email");
        console.log("Password: ", password);
        console.log("REf select", this.selectedPlan.current.value)

        console.log("name:",  nameInput.value);
        console.log("email: ", emailInput.value);

        let name = nameInput.value;
        let email = emailInput.value;
        let planId = this.state.plan.find((plan) => plan.name === this.selectedPlan.current.value).id;

        if (name.length > 2 && email.length > 5){
            api.post("companies/", {
                name: name,
                email: email,
                password: password,
                "plan_id": planId
            }).then(response => {
                console.log(response);
                this.setState({
                    clipBoardText: `${response.data.email}:${response.data.password}`,
                    copyToClipBoard: true
                })
            }).catch(error => {
                console.log(error);
            });
        }


    };

    componentDidMount() {

        api.get('plans/').then(res => {if (res.status === 200 && res.data.length > 0) {
            this.setState({plan: res.data});}
            //console.log(res.data);
        }).catch(error => console.error(error));
    }





    render() {

        const { payload } = Session.get();

        let {plan, clipBoardText} = this.state;
        return (
            <>
                <UserHeader
                    info="This is your company register page. from here you can add companies/users who are
                    going to be able to see your applicants in the system."
                />

                {/*    Container*/}
                <Container className="mt--7" fluid>
                    <Row>
                        <Col className="order-xl-1" xl="12">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="12">
                                            <h3 className="mb-0">Add a new company</h3>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <h6 className="heading-small text-muted mb-4">
                                            Company information
                                        </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-username"
                                                        >
                                                            Name
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-username"
                                                            placeholder="Company name"
                                                            type="text"
                                                            ref={this.name}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">

                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-email"
                                                        >
                                                            Email address
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-email"
                                                            //onChange={e => this.onChangeEmail(e.target.value)}
                                                            placeholder="company@example.com"
                                                            type="email"
                                                            required
                                                            ref = { this.email }
                                                        />

                                                </Col>


                                            </Row>
                                            <Row>
                                                <Col lg="1">

                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-plan"
                                                >
                                                    Select plan
                                                </label>

                                                <select
                                                    name="input-plan"
                                                    className="form-control-alternative"
                                                    id="selected-plan"
                                                    ref = { this.selectedPlan }
                                                >
                                                    {this.getPlans(plan)}
                                                </select>
                                                </Col>
                                                <Button color="primary" type="button" onClick={() => {this.saveCompany()}}>Save company</Button>
                                            </Row>
                                            <Row>
                                                {this.state.copyToClipBoard ? this.copy(clipBoardText) : null}
                                            </Row>
                                        </div>

                                    </Form>
                                </CardBody>
                            </Card>


                        </Col>

                    </Row>

                </Container>

            </>
        );
    }
}

export default RegisterCompany;