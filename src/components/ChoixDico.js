import React, {Component} from 'react'
import '../css/ChoixDico.css'

const TABDICO = [
        {dico: "noms", rendu:" noms communs français"},
        {dico: "prenoms", rendu:" prénoms du monde"},
        {dico: "villes", rendu:" villes de France"}
    ];


class ChoixDico extends Component {

    state = {
        dicoActif: this.props.dicoActif,
        autresDico: [],
    };

    dictionnaireActif(){
        switch (this.props.dicoActif) {
            case "prenoms":
                return "prénoms du monde";

            case "villes":
                return "villes du France";

            default:
                return "noms communs français";
        }
    }

    lesAutresDicos(){
        return TABDICO.filter(
            ligne =>  ligne.dico !== this.props.dicoActif
        );
    }

    onClick(dico){
        this.props.onClick(dico);
    }


    render(){

        let btnAutresDicos = this.lesAutresDicos().map((dico, index)=>
            <button key={index} onClick={() => this.onClick(dico.dico)}>
                Jouer avec les {dico.rendu}
            </button>
        );

        return(
            <div>
                <p>Vous jouez avec le dictionnaire des {this.dictionnaireActif()}</p>

                {btnAutresDicos}
            </div>
        );
    }
}

export default ChoixDico;