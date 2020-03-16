
import React from "react";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";
import { Session } from 'bc-react-session';

class UserHeader extends React.Component {

  render() {

    const { payload } = Session.get();

    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundImage:
              "url(" + require("assets/img/theme/23514.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="7" md="10">
                <h1 className="display-2 text-white">Hello {payload.name}</h1>
                <p className="text-white mt-0 mb-5">
                  This is your profile page. You can edit your info, watch you view counts and plan's limit.
                </p>
                <Button
                  color="info"
                  href="#"
                  onClick={this.props.handler}
                >
                  {this.props.textButton}
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default UserHeader;
