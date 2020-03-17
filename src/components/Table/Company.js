import React from "react";
import {
    Media,
} from "reactstrap";

class Company extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            name: this.props.name,
            email: this.props.email,
            planName: this.props.planName,
            planLimit: this.props.planLimit,
            currentViews: this.props.currentViews
        }
    }

    render() {

        const { id, name, email, planName, planLimit, currentViews } = this.state;

        return (
            <>

                <tr key={id}>
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
                                    {name}
                                </span>
                            </Media>
                        </Media>
                    </th>
                    <td>

                        <div className="progress-wrapper">
                            <div className="progress-info">
                                <div className="progress-percentage">
                                    <span>{email}</span>
                                </div>
                            </div>
                        </div>

                    </td>

                    <td>

                        <div className="progress-wrapper">
                            <div className="progress-info">
                                <div className="progress-percentage">
                                    <span>{planName}</span>
                                </div>
                            </div>
                        </div>

                    </td>

                    <td>

                        <div className="progress-wrapper">
                            <div className="progress-info">
                                <div className="progress-percentage">
                                    <span>{currentViews}</span>
                                </div>
                            </div>
                        </div>

                    </td>

                    <td>

                        <div className="progress-wrapper">
                            <div className="progress-info">
                                <div className="progress-percentage">
                                    <span>{planLimit}</span>
                                </div>
                            </div>
                        </div>

                    </td>
                </tr>


            </>
        );

    }

}

export default Company;