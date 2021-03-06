
import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";
import JobCard from '../Category/JobCard';
import api from '../../utils/API';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    }
  }

  componentDidMount() {
    api.get('jobs/').then(res => {if (res.status === 200 && res.data.length > 0) {
        this.setState({items: res.data});}
    }).catch(error => console.error(error));
  }

  renderCategories = (items) => {
    let row = [];

    if (typeof items !== 'undefined') {


      // Outer loop to create parent
      let count = 0;
      for (let i = 0; i < items.length; i = i + 4) {
        let children = [];

        //Inner loop to create children
        for (let j = i; j < (i + 4); j++) {
          if (j < items.length) {
            console.log(items[j]);
            children.push(
                <Col lg="6" xl="3" key={`Card#${items[j].id}`} className="mb-4">
                  <JobCard
                      key={`Card#${items[j].id}`}
                      id={items[j].id}
                      name={items[j].name}
                      department={items[j].department}
                      requirements={items[j].requirements}
                      state={items[j].state}
                      colorClass={`ribbon ${items[j].color_class}`}/> </Col>)
          }
        }
        //Create the parent and add the children
        row.push(<Row key={`CardRow#${count}`}>{children}</Row>);
        //row.push(<br/>);
        console.log("row", count);
        count++;
      }

    }

    return row
  };

  render() {
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              {this.renderCategories(this.state.items)}
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
