
import React from "react";
import { Session } from 'bc-react-session';
import API from './../../utils/API';
import LocalStorageService from "./../../services/LocalStorageService";


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

class Profile extends React.Component {

  constructor(props) {
    super(props);

    const { payload } = Session.get();

    this.state = {
      editing: false,
      changePassword: false,
      email: payload.email,
      name: payload.name,
      password: "ProntoBPO",
      editButton: "Edit profile",
      classPwd1: "form-control-alternative",
      classPwd2: "form-control-alternative",
      classField1: "",
      classField2: "",
    }
  }

  async componentDidMount() {

    if(Session.get().isValid){
      Session.onExpiration((session) => session.destroy());
    }

    try {
      let response = await API.post('verify/', {
        token: LocalStorageService.getAccessToken()
      });

      if (response.status === 200) {
        Session.setPayload(response.data.company);
        this.setState({})
      }
      console.log(response);

    } catch (error) {
      console.log(error);
      LocalStorageService.clearToken();
      Session.destroy();
    }
  }

  editProfile(event) {
    event.preventDefault();
    this.setState({
      editing: !this.state.editing,
      editButton: !this.state.editing ? "Cancel" : "Edit profile"
    });
  }

  onChangeEmail(value) {
    this.setState({ email: value });
  }

  onChangeName(value) {
    this.setState({ name: value });
  }

  onChangePassword(value) {

    let newClass = "is-valid";
    let fieldClass = "has-success";
    if (value.length < 8) {
      newClass = "is-invalid";
      fieldClass = "has-danger";
    }

    this.setState({ password: value, classPwd1: this.state.classPwd1 + " " + newClass, classField1: fieldClass });
  }

  verifyPassword(value) {


    let newClass = "is-valid";
    let fieldClass = "has-success";

    if (value !== this.state.password) {
      newClass = "is-invalid";
      fieldClass = "has-danger";
    }

    this.setState({ classPwd2: this.state.classPwd2 + " " + newClass, classField2: fieldClass });

  }

  changePassword = (event) => {
    event.preventDefault();
    let change = !this.state.changePassword;
    let password = "";
    let classPwd1 = this.state.classPwd1;
    let classPwd2 = this.state.classPwd2;

    if (this.state.changePassword) {
      password = "ProntoBPO";
      classPwd1 = "form-control-alternative";
      classPwd2 = "form-control-alternative";
    }

    this.setState({
      password: password,
      changePassword: change,
      classField1: "",
      classField2: "",
      classPwd1: classPwd1,
      classPwd2: classPwd2
    });

  }

  saveChanges = async (event) => {
    event.preventDefault();

    if (this.state.name && this.state.email && this.state.password) {
      const { payload } = Session.get();

      try {
        let data = {
          name: this.state.name,
          email: this.state.email
        }

        if (this.state.changePassword && this.state.password) {
          data.password = this.state.password;
        }

        const response = await API.patch('companies/' + payload.id + "/", data);

        if(response.status === 200){
          Session.setPayload(response.data.company);
          this.setState({});
        }

        console.log(response);
      } catch (error) {
        console.log(error);
        Session.destroy();
      }

      this.setState({ editing: false });
    }else{
      console.log("EMPTY FIELDS");
    }
  }

  render() {

    const { payload } = Session.get();

    return (
      <>
        <UserHeader
            handler={this.editProfile.bind(this)}
            textButton={this.state.editButton}
            info="This is your profile page. You can see the progress you've
                  made with your work and manage your projects or assigned tasks"
        />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#image" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("assets/img/theme/392.jpg")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">

                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">{payload.limit_exceeded ? payload.plan.no_of_views : payload.no_views}</span>
                          <span className="description">Views</span>
                        </div>
                        <div>
                          <span className="heading">{payload.plan.name}</span>
                          <span className="description">Plan</span>
                        </div>
                        <div>
                          <span className="heading">{payload.plan.no_of_views}</span>
                          <span className="description">Limit</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                      {payload.name}
                    </h3>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="12">
                      <h3 className="mb-0">My account</h3>
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
                              value={this.state.name}
                              onChange={e => this.onChangeName(e.target.value)}
                              readOnly={!this.state.editing}
                              id="input-username"
                              placeholder="Name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              readOnly={!this.state.editing}
                              value={this.state.email}
                              onChange={e => this.onChangeEmail(e.target.value)}
                              placeholder="company@example.com"
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <label
                            className="form-control-label"
                            htmlFor="input-password"
                          >
                            Password

                              {
                              this.state.editing ?
                                <Button className="btn-icon btn-2 ml-2" size="sm" color="primary" type="button" onClick={this.changePassword}>
                                  <span className="btn-inner--icon">
                                    <i className="fas fa-pen"></i>
                                  </span>
                                </Button>
                                : null
                            }

                          </label>
                          <FormGroup className={this.state.classField1}>
                            <Input
                              className={this.state.classPwd1}
                              value={this.state.password}
                              readOnly={!this.state.changePassword}
                              id="input-password"
                              placeholder="Password"
                              onChange={e => this.onChangePassword(e.target.value)}
                              type="password"
                            />

                          </FormGroup>

                        </Col>
                      </Row>
                      {

                        this.state.changePassword ? <Row>
                          <Col lg="12">
                            <label
                              className="form-control-label"
                              htmlFor="input-confirm-password"
                            >
                              Confirm new Password

                            </label>
                            <FormGroup className={this.state.classField2}>
                              <Input
                                className={this.state.classPwd2}
                                id="input-confirm-password"
                                placeholder="Password"
                                type="password"
                                onChange={e => this.verifyPassword(e.target.value)}
                              />

                            </FormGroup>

                          </Col>
                        </Row>
                          : null

                      }
                      {
                        this.state.editing ? <Row >
                          <Col lg="8" />
                          <Col lg="4" className="text-right">
                            <Button
                              color="primary"
                              href="#"
                              onClick={this.saveChanges}
                            >
                              Save Changes
                          </Button>
                          </Col>
                        </Row> : null
                      }
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

export default Profile;
