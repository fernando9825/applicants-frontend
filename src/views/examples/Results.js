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

// reactstrap components
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Modal,
  Button,
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
      modalData: {}
    };
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
        console.log(error);
      }

    } else {
      this.setState({
        exampleModal: false
      });
    }
  };

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
                  <p>{JSON.stringify(this.state.modalData)}</p>
                </Col>
              </Row>
            </div>
            <div className="modal-footer">
              <Button
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={() => this.toggleModal("exampleModal")}
              >
                Close
            </Button>
              <Button color="primary" type="button">
                Save changes
            </Button>
            </div>
          </Modal>
        </Container>
      </>
    );
  }
}

export default Results;
