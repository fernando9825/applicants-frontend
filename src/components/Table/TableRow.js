import React from "react";
import {
    Badge, DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Media,
    Progress,
    UncontrolledDropdown,
    UncontrolledTooltip
} from "reactstrap";

class TableRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { id, name, department, description, requirements, state, colorClass } = this.props;
        if (typeof description == "string"){
            if (description.length >= 80){
                description = description.toString().slice(0, 80) + "...";
            }
        }

        return(
            <tr>
                <th scope="row">
                    <Media className="align-items-center">
                        <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                        >
                            <img
                                alt="..."
                                src={require("assets/img/theme/bootstrap.jpg")}
                            />
                        </a>
                        <Media>
                            <span className="mb-0 text-sm">
                                {name}
                            </span>
                        </Media>
                    </Media>
                </th>
                <td>{department}</td>
                <td>
                    <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                        {state}
                    </Badge>
                </td>
                <td>
                    <div className="d-flex align-items-center">
                        <span className="mr-2">{description}</span>
                        {/*<div>
                            <Progress
                                max="100"
                                value="60"
                                barClassName="bg-warning"
                            />
                        </div>*/}
                    </div>
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
                                onClick={e => e.preventDefault()}
                            >
                                Action
                            </DropdownItem>
                            <DropdownItem
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                            >
                                Another action
                            </DropdownItem>
                            <DropdownItem
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                            >
                                Something else here
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </td>
            </tr>
        );
    }
}

export  default TableRow;