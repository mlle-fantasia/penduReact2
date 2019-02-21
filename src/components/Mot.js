import React, {Component} from 'react'

class Mot extends Component {


    render() {
        return(
            <div className="phrase" >
                {this.props.mot}
            </div>
        );
    }

}
export default Mot