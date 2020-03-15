import React from "react";

import {Card, CardBody, CardTitle, Row} from "reactstrap";

class CategoryCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            name: props.name,
            department: props.department,
            state:  props.state
        };
    }

    openCategory = (e, id) => {
        console.info("Category: ", id);
    };

    render() {
        // data binding
        let {id, name, department, state} = this.state;

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

export default CategoryCard;