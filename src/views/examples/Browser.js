import React from "react";
import API from '../../utils/API';


// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Input,
    Container,
    Row,
    Col
} from "reactstrap";
// core components
import HeaderBase from "./../../components/Headers/HeaderBase";
import { Redirect } from 'react-router-dom';

class Browser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            departments: [],
            degrees: [],
            jobs: [],
            results: [],
            redirect: false,
            department: "",
            priority: -1,
            degree: "",
            job: "",
            name: ""
        }
    }

    onDepartmentChange(value) {
        console.log(value);
        this.setState({ department: value });
    }

    onDegreeChange(value) {
        console.log(value);
        this.setState({ degree: value });
    }

    onPriorityChange(value) {
        console.log(value);
        this.setState({ priority: value });
    }

    onJobChange(value) {
        console.log(value);
        this.setState({ job: value });
    }

    onNameChange(value) {
        console.log(value);
        this.setState({ name: value });
    }


    fecthAll() {

        API.get('departments/').then((response) => {

            this.setState({
                departments: response.data
            });

            console.log(response);

        }).catch((e) => {
            console.log(e);
        });


        API.get('degrees/').then((response) => {

            this.setState({
                degrees: response.data
            });

            console.log(response);

        }).catch((e) => {
            console.log(e);
        });

        API.get('jobs/').then((response) => {

            this.setState({
                jobs: response.data
            });

            console.log(response);

        }).catch((e) => {
            console.log(e);
        });
    }

    search = (e) => {

        this.setState({
            redirect: true
        });

    }

    genParams(){
        
        let params = "?";

        if(this.state.name !== ""){
            params = params + "name=" +this.state.name;
        }

        if(this.state.department !== ""){
            params = params + "&department=" +this.state.department;
        }

        if(this.state.job !== ""){
            params = params + "&job=" +this.state.job;
        }

        if(this.state.degree !== ""){
            params = params + "&degree=" +this.state.degree;
        }

        if(this.state.priority !== "" && this.state.priority > -1){
            params = params + "&priority=" +this.state.priority;
        }

        return params;
    }

    componentDidMount() {

        this.fecthAll();

    }

    render() {

        if (this.state.redirect) {

            return <Redirect push to={{
                pathname: '/admin/results',
                params: {
                    url: this.genParams()
                }
            }} />
        }

        return (
            <>
                <HeaderBase />
                {/* Page content */}
                <Container className="mt--7" fluid>
                    <Row>
                        <Col lg="12">

                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="12">
                                            <h3 className="mb-0">Filtering profiles</h3>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Row>

                                        <Col lg="4">
                                            <FormGroup>
                                                <label htmlFor="departments">Department</label>
                                                <Input id="departments" type="select" onChange={e => this.onDepartmentChange(e.target.value)}>
                                                    <option value=""></option>
                                                    {
                                                        this.state.departments.map(dep => {
                                                            return <option key={dep.id} value={dep.name}>{dep.name}</option>
                                                        })
                                                    }
                                                </Input>
                                            </FormGroup>
                                        </Col>

                                        <Col lg="4">
                                            <label
                                                className="form-control-label"
                                                htmlFor="priority"
                                            >
                                                Priority
                                            </label>
                                            <Input
                                                onChange={e => this.onPriorityChange(e.target.value)}
                                                id="priority"
                                                min={0}
                                                max={3}
                                                type="number"
                                            />
                                        </Col>

                                        <Col lg="4">
                                            <FormGroup>
                                                <label htmlFor="degrees">Degree</label>
                                                <Input id="degrees" type="select" onChange={e => this.onDegreeChange(e.target.value)}>
                                                    <option value=""></option>
                                                    {
                                                        this.state.degrees.map(deg => {
                                                            return <option key={deg.id} value={deg.name}>{deg.name}</option>
                                                        })
                                                    }
                                                </Input>
                                            </FormGroup>
                                        </Col>

                                    </Row>

                                    <Row>
                                        <Col lg="4">
                                            <FormGroup>
                                                <label htmlFor="jobs">Job</label>
                                                <Input id="jobs" type="select" onChange={e => this.onJobChange(e.target.value)}>
                                                    <option value=""></option>
                                                    {
                                                        this.state.jobs.map(job => {
                                                            return <option key={job.id} value={job.name}>{job.name}</option>
                                                        })
                                                    }
                                                </Input>
                                            </FormGroup>
                                        </Col>

                                        <Col lg="8">
                                            <FormGroup>
                                                <label htmlFor="name">Search by name</label>
                                                <Input
                                                    className="form-control-alternative"
                                                    onChange={e => this.onNameChange(e.target.value)}
                                                    placeholder="Example"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg="12" className="text-right">
                                            <Button className="btn-icon btn-3" color="primary" type="button" onClick={this.search.bind(this)}>
                                                <span className="btn-inner--icon">
                                                    <i className="fas fa-search"></i>
                                                </span>
                                                <span className="btn-inner--text">Search</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>

                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Browser;
