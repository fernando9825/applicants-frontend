
import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Modal,
  Button,
  FormGroup,
  Input,
  Col,
} from "reactstrap";
// core components
import HeaderBase from "../../components/Headers/HeaderBase";
import API from "../../utils/API";
import { Redirect } from "react-router-dom";
import Applicant from "./../../components/Applicant/Applicant"

class Results extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      results: [],
      redirect: false,
      exampleModal: false,
      notificationModal: false,
      modalData: {}
    };
  }


  showNotification = async (state) => {
    this.setState({
      [state]: !this.state[state]
    });
  }

  toggleModal = async (state, id) => {

    if (!this.state[state]) {

      try {
        const response = await API.get("applicants/" + id + "/");
        if (response.status === 200) {
          console.log(response.data);
          this.setState({
            modalData: response.data,
            exampleModal: true
          });
        }
      } catch (error) {
        this.showNotification("notificationModal");
        console.log(error);
      }

    } else {
      this.setState({
        exampleModal: false
      });
    }
  }

  fetchResults() {

    if (this.props.location.params === undefined) {
      this.setState({
        redirect: true
      });
    } else {

      console.log("applicants/" + this.props.location.params.url);

      API.get("applicants/" + this.props.location.params.url).then(response => {

        if (response.status === 200) {

          console.log(response.data);

          this.setState({
            results: response.data
          });

        }

      }).catch(e => {

        console.log(e);

      });

    }
  }

  componentDidMount() {
    if (this.props.location.params === undefined) {
      this.setState({
        redirect: true
      });
    }
  }

  componentWillMount() {
    this.fetchResults();
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to="/admin/browser" />
    }

    return (
      <>
        <HeaderBase />
        {/* Page content */}
        <Container className="mt--7" fluid>

          {/* Dark table */}
          <Row className="mt-5">
            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <h3 className="text-white mb-0">Applicants</h3>
                </CardHeader>
                <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Priority</th>
                      <th scope="col">Tags</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {

                      this.state.results.map((result, index) => {

                        return (
                          <Applicant
                            id={result.id}
                            name={result.partner_name}
                            priority={result.priority}
                            categories={result.categories}
                            show={this.toggleModal}
                            modal="exampleModal" />
                        );


                      })

                    }
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>

          <Modal
            className="modal-dialog-centered"
            isOpen={this.state.exampleModal}
            size="lg"
            toggle={() => this.toggleModal("exampleModal", 1)}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Profile
            </h5>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => this.toggleModal("exampleModal")}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
              <Row>
                <Col lg="12">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="name"
                    >
                      Name
                            </label>
                    <Input
                      className="form-control-alternative"
                      id="name"
                      readOnly
                      value={this.state.modalData.partner_name}
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="degree"
                    >
                      Degree
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="degree"
                      readOnly
                      value={this.state.modalData.type}
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="subject"
                    >
                      Subject
                            </label>
                    <Input
                      className="form-control-alternative"
                      id="subject"
                      readOnly
                      value={this.state.modalData.name}
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="job"
                    >
                      Applied Job
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="job"
                      readOnly
                      value={this.state.modalData.job}
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="department"
                    >
                      Department
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="department"
                      readOnly
                      value={this.state.modalData.department}
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-email"
                    >
                      Email
                            </label>
                    <Input
                      className="form-control-alternative"
                      id="name"
                      readOnly
                      value={this.state.modalData.email_from ? this.state.modalData.email_from : ""}
                      type="email"
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="salary"
                    >
                      Salary Expected
                            </label>
                    <Input
                      className="form-control-alternative"
                      id="salary"
                      readOnly
                      value={this.state.modalData.salary_expected ? "$" + this.state.modalData.salary_expected : "$0.0"}
                      type="text"
                    />
                  </FormGroup>
                </Col>

              </Row>
              <Row>
                <Col lg="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="phone"
                    >
                      Phone
                            </label>
                    <Input
                      className="form-control-alternative"
                      id="phone"
                      readOnly
                      value={this.state.modalData.partner_phone}
                      type="phone"
                    />
                  </FormGroup>
                </Col>
                <Col lg="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="mobile"
                    >
                      Mobile
                            </label>
                    <Input
                      className="form-control-alternative"
                      id="mobile"
                      readOnly
                      value={this.state.modalData.partner_mobile}
                      type="phone"
                    />
                  </FormGroup>
                </Col>
                <Col lg="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="priority"
                    >
                      Priority
                            </label>
                    <Input
                      className="form-control-alternative"
                      id="priority"
                      readOnly
                      value={this.state.modalData.priority}
                      type="number"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>

              </Row>

              <Row>
                <Col lg="12">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="description"
                    >
                      Description
                            </label>
                    <Input
                      className="form-control-alternative"
                      id="description"
                      readOnly
                      value={this.state.modalData.description}
                      type="textarea"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </div>
            <div className="modal-footer">
              <Button
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={() => this.toggleModal("exampleModal", 1)}
              >
                Close
              </Button>
            </div>
          </Modal>

          <Modal
            className="modal-dialog-centered modal-warning"
            contentClassName="bg-gradient-warning"
            isOpen={this.state.notificationModal}
            toggle={() => this.showNotification("notificationModal")}
          >
            <div className="modal-header">
              <h6 className="modal-title" id="modal-title-notification">
                Limit Exceeded
                </h6>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => this.showNotification("notificationModal")}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="py-3 text-center">
                <i className="ni ni-bell-55 ni-3x" />
                <h4 className="heading mt-4">You should read this!</h4>
                <p>
                  You have been Limit Exceeded of your plan!
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <Button
                className="text-white ml-auto"
                color="link"
                data-dismiss="modal"
                type="button"
                onClick={() => this.showNotification("notificationModal")}
              >
                Close
                </Button>
            </div>
          </Modal>

        </Container>
      </>
    );
  }
}

export default Results;
