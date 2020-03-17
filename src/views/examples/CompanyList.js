import React from "react";
import HeaderBase from "../../components/Headers/HeaderBase";
import Company from "../../components/Table/Company";
import api from "../../utils/API";
import {Card, CardHeader,Container, Row, Table} from "reactstrap";

class CompanyList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: []
        }
    }

    componentDidMount() {
        api.get("companies/").then(res => {
            if (res.status === 200 && res.data.length > 0) {
                this.setState({items: res.data});
            }
        }).catch(error => console.error(error))
    }

    renderCompanies = (items) => {

        console.log(JSON.stringify(items));
        if (typeof items !== 'undefined') {

                let children = [];

                //Inner loop to create children
                for (let j = 0; j < items.length; j++) {

                        console.log(items[j]);
                        children.push(
                            <Company
                                id={items[j].id}
                                name={items[j].name}
                                email={items[j].email}
                                planName={items[j].plan.name}
                                currentViews={items[j].no_views}
                                planLimit={items[j].plan.no_of_views}
                            />);


                }

            return children;
        }
    };

    render() {

        let {items} = this.state;
        return (
            <>
                <HeaderBase/>

                <Container className="mt--7" fluid>

                    {/* Dark table */}
                    <Row className="mt-5">
                        <div className="col">
                            <Card className="bg-default shadow">
                                <CardHeader className="bg-transparent border-0">
                                    <h3 className="text-white mb-0">Companies</h3>
                                </CardHeader>
                                <Table
                                    className="align-items-center table-dark table-flush"
                                    responsive>
                                    <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Company</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Plan</th>
                                        <th scope="col">currentViews</th>
                                        <th scope="col">Limit</th>
                                        <th scope="col"/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {/*<Company
                    id={1}
                    name={"Fernando"}
                    email={"fer25alvarado@gmail.com"}
                    planName={"Gold"}
                    currentViews={23}
                    planLimit={100}
                />*/}

                                    {this.renderCompanies(items)}

                                    </tbody>
                                </Table>
                            </Card>
                        </div>
                    </Row>
                </Container>
            </>
        );
    }

}

export default CompanyList;