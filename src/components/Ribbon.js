import React from 'react';

class Ribbon extends React.Component {

    
    createTable = () => {
        let table = []
    
        // Outer loop to create parent
        for (let i = 0; i < 3; i++) {
          let children = []
          //Inner loop to create children
          for (let j = 0; j < 5; j++) {
            children.push(<td>{`Column ${j + 1}`}</td>)
          }
          //Create the parent and add the children
          table.push(<tr>{children}</tr>)
        }
        return table
    }

    render() {
      return (
            <div class="col-lg-4">
                <div class="card-box ribbon-box">
                    <div class="ribbon ribbon-purple float-left"><i class="mdi mdi-access-point mr-1"></i> Purple</div>
                    <h5 class="text-purple float-right mt-0">Purple Header</h5>
                    <div class="ribbon-content">
                        <p class="mb-0">Quisque nec turpis at urna dictum luctus. Suspendisse convallis dignissim eros at volutpat. In egestas
                            mattis dui. Aliquam mattis dictum aliquet. Nulla sapien mauris, eleifend et sem ac, commodo dapibus odio.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Ribbon;