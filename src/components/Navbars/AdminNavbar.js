
import React from "react";
import { Link } from "react-router-dom";
import { Session } from 'bc-react-session';
import LocalStorageService from "./../../services/LocalStorageService";


// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";

class AdminNavbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };

    this.logout = this.logout.bind(this);

  }

  componentDidMount(){
    this.sessionChange = Session.onChange((session) => {
      console.log(session);
      
      if(session.expired) console.log('The session has expired')
      if(session.autenticated) console.log('No one has logged in')
      
    });
  }


  logout(event) {
    event.preventDefault();
    Session.destroy();
    LocalStorageService.clearToken();
    this.setState({ redirect: true });
  }

  render() {

    const session = Session.get();

    if (session.expired || !session.isValid) {
      //return <Redirect to="/auth/login" />
      this.props.history.push("/auth/login");
    }

    const { payload } = Session.get();

    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {this.props.brandText}
            </Link>

            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={require("assets/img/theme/392.jpg")}
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {payload.name}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItem to="/admin/profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="#pablo" onClick={this.logout}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
