/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import API from './../../utils/API'
import LocalStorageService from './../../services/LocalStorageService'
import { Session } from 'bc-react-session';

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col
} from "reactstrap";


class Login extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      redirect: false,
      email: '',
      password: '',
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }


  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }


  signin = async () => {

    try {
      let response = await API.post('auth/', {

        email: this.state.email,
        password: this.state.password
  
      });
  
      if (response.status === 200) {
  
        Session.start({
          payload: response.data.company,
          expiration: 10800000 // (optional) defaults to 1 day
        });
  
        LocalStorageService.setToken(response.data);
  
        this.setState({
          redirect: true
        });
      }
    } catch (error) {
      
      console.log(error);

    }

  }

  render() {

    const session = Session.get();

    if (session.isValid || session.autenticated || this.state.redirect) {
      // return <Redirect from="auth/login" to='/admin/index' />
      this.props.history.push("/admin/index");
    }

    return (
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign In</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Email" type="email" autoComplete="new-email" onChange={this.handleChangeEmail} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Password" type="password" autoComplete="new-password" onChange={this.handleChangePassword} />
                </InputGroup>
              </FormGroup>

              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={this.signin}>
                  Sign in
                  </Button>
              </div>
            </Form>
          </CardBody>
        </Card>

      </Col>
    );
  }
}

export default Login;
