import React, { Component } from "react";
import {
    Badge,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Progress,
  } from "reactstrap";

class Applicant extends Component {


    getPriority(priority) {
        return ((priority / 3) * 100).toFixed(2);
    }

    render() {
        return (
            <tr key={this.props.id}>
                <th scope="row">
                    <Media className="align-items-center">
                        <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                        >
                            <img
                                alt="..."
                                src={require("assets/img/theme/user.png")}
                            />
                        </a>
                        <Media>
                            <span className="mb-0 text-sm">
                                {this.props.name}
                            </span>
                        </Media>
                    </Media>
                </th>
                <td>

                    <div className="progress-wrapper">
                        <div className="progress-info">
                            <div className="progress-percentage">
                                <span>{this.getPriority(this.props.priority)}%</span>
                            </div>
                        </div>
                        <Progress max="3" value={this.props.priority} />
                    </div>

                </td>
                <td>
                    {
                        this.props.categories.map((cat, index) => {
                            return <Badge className="mr-1 text-white" color="primary" key={index}>{cat}</Badge>
                        })
                    }
                </td>
                <td className="text-right">
                    <UncontrolledDropdown>
                        <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                        >
                            <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                                href="#pablo"
                                onClick={() => this.props.show(this.props.modal, this.props.id)}
                            >
                                Profile
                              </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </td>
            </tr>
        );
    }

}

export default Applicant;