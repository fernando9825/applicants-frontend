import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Ribbon from './components/Ribbon'
// import { render } from '@testing-library/react';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      data: 'Jordan Belfort', 
      isLoaded: true, // test
      items: []
    }
  }

  renderRibbons = () => {

    //this.fetchData("localhost:8000/api/jobs/")
    //console.log(data)

    let row = []

      // Outer loop to create parent
      for (let i = 0; i < 3; i++) {
        let children = []
        //Inner loop to create children
        for (let j = 0; j < 3; j++) {
          children.push(<Ribbon name="Fernando"/>)
        }
        //Create the parent and add the children
        row.push(<div class="row">{children}</div>)
      }
      return row
  }


  componentDidMount(){

    fetch("http://localhost:8000/api/jobs/?format=json", {
      headers: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InJvb3QiLCJleHAiOjE1ODM5MDU5NjQsImVtYWlsIjoiZmVyMjVhbHZhcmFkb0BnbWFpbC5jb20ifQ.mSl8oz0D2i1wAkdEToFl5hnWzsYmaK3tNjMSO5VsHsM',
        //'Origin':'http://localhost:3000'
        mode: 'cors',
        Vary: 'Accept',
        Connection: 'keep-alive',
        'Accept-Encoding': 'gzip, deflate, br',
        'method': 'GET'
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          alert(result)
          this.setState({
            isLoaded: true,
            items: result
          }
            );
          
          
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error: true
          });
        }
      )

  
  }

  render(){

    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
    return <div>Loading...{console.log(items)}</div>;
    } else {
    return (
      <div className="App">
        <div class="container-fluid">

          {/* <h1>{this.state.items}</h1> */}
          {/* <Ribbon name="Fernando"/> */}
                    {/* <!-- start page title --> */}
                    <div class="row">
                        <div class="col-12">
                            
                            <div class="page-title-box">
                                <div class="page-title-right">
                                    <ol class="breadcrumb m-0">
                                        <li class="breadcrumb-item"><a href="javascript: void(0);">Minton</a></li>
                                        <li class="breadcrumb-item"><a href="javascript: void(0);">UI Elements</a></li>
                                        <li class="breadcrumb-item active">Ribbons</li>
                                    </ol>
                                </div>
                                <h4 class="page-title">Ribbons</h4>
                            </div>
                        </div>
                    </div>     
                    {/* <!-- end page title -->  */}

                  
                  {/* Ribbons */}
                  {this.renderRibbons()}

                    
                    
                </div> 
      </div>
    )
  }
}
}



export default App;
