import React from "react";

import {Card, CardBody, CardTitle, Row} from "reactstrap";
import Redirect from "react-router-dom/es/Redirect";

class JobCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            name: props.name,
            department: props.department,
            state:  props.state,
            redirect: false
        };
    }

    handleRedirect() {
        this.setState({ redirect: true });
    }

    openCategory = (e, id) => {
        console.info("Category: ", id);
        //this.props.history.push('/icons');
        this.handleRedirect();
    };

    render() {
        // data binding
        let {id, name, department, state, redirect} = this.state;

        // THIS COULD BE HELPFUL @C3RBERUSS
        // https://tylermcginnis.com/react-router-url-parameters/
        if (redirect){
            return (<Redirect to={`results/${id}`} />)
        }

        return(
            <Card className="card-stats mb-4 mb-xl-0" onClick={(e) => this.openCategory(e, id)}>
                <CardBody key={id}>
                    <Row>
                        <div className="col">
                            <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                            >
                                {department}
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                                {name}
                          </span>
                        </div>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-nowrap">{state}</span>
                    </p>
                </CardBody>
            </Card>
        );
    }
}

export default JobCard;