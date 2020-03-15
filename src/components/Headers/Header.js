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
import { Container, Row, Col } from "reactstrap";
import CategoryCard from '../Category/CategoryCard';
import api from '../../utils/API';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    }
  }

  componentDidMount() {
    api.get('/jobs/').then(res => {if (res.status === 200 && res.data.length > 0) {
        this.setState({items: res.data});}
    }).catch(error => console.error(error));
  }

  renderCategories = (items) => {
    if (typeof items !== 'undefined') {
      let row = [];

      // Outer loop to create parent
      let count = 0;
      for (let i = 0; i < items.length; i = i + 4) {
        let children = [];

        //Inner loop to create children
        for (let j = i; j < (i + 4); j++) {
          if (j < items.length) {
            console.log(items[j]);
            children.push(
                <Col lg="6" xl="3" key={`Card#${items[j].id}`}>
                  <CategoryCard
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
        row.push(<br/>);
        console.log("row", count);
        count++;
      }
      return row
    }
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
