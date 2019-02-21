import React, {Component} from "react";

class Redemarrer extends Component {


    redemarrer(){
        console.log('coucou');
        this.props.redemarrer();
    }

    render() {
        return(
            <button className={`redemarer`} onClick={() => this.redemarrer()}> Commencer une nouvelle partie</button>
        );
    }

}
export default Redemarrer;