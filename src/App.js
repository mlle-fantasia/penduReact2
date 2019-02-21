//dépendances
import React, { Component } from 'react';
import { Stage } from 'react-konva';

//components
import Canvas from './components/Canvas'
import Mot from './components/Mot';
import AlphabetLettre from './components/AlphabetLettre';
import Redemarrer from "./components/Redemarrer";

//css
import './css/App.css';


import {getDictionnaire, computeDisplay} from "./services/Service";

const ALPHABET = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

class App extends Component {

    constructor(props) {
        super(props);
        this.redemarrer = this.redemarrer.bind(this);
    }

    state = {
        mot: '',
        phraseCachee:'',
        lettreDejaClickee: [],
        essaisManques:11,
        perdu:false,
        gagne:false,

    };

    async componentDidMount() {
        let mot = await getDictionnaire();
        this.setState({mot: mot});
        let phraseCachee = await computeDisplay(mot, this.state.lettreDejaClickee);
        this.setState({phraseCachee: phraseCachee});
    };


    handleLettreClick=(e, lettre)=>{
        const {mot, lettreDejaClickee, essaisManques } = this.state;

            //ajout de la lettre cliquée dans le tableau
        let newtab = lettreDejaClickee;
        newtab.push(lettre);
        this.setState({ lettreDejaClickee: newtab});

            //rerendu de la phase cachée et test si partie gagnée
        let newPraseCachee = computeDisplay(mot, newtab);
        if(newPraseCachee === mot){
            this.setState({ gagne: true });
        }
        this.setState({ phraseCachee: newPraseCachee});

            //test si la lettre cliquée est dans le mot
        let tabPhrase = mot.split('');
        let indexTrouve = tabPhrase.indexOf(lettre);
        let newEssaiRestant = essaisManques;
        if(indexTrouve === -1) {
            newEssaiRestant = essaisManques -1;
            this.setState({ essaisManques: newEssaiRestant });
            console.log(newEssaiRestant);
        }

            //test si la partie est perdu
        if (essaisManques<2){
            console.log('perdu');
            this.setState({ perdu: true });
        }
    };

    async redemarrer(){
        const newtab = [] ;
        const newGagne = false;
        const newPerdu = false;
        const newMot = await getDictionnaire();
        const newEssaisManques = 11;
        const newPhraseCachee = await computeDisplay(newMot, newtab);

        this.setState({ lettreDejaClickee : newtab,  gagne : newGagne, mot : newMot, perdu : newPerdu, essaisManques : newEssaisManques, phraseCachee: newPhraseCachee});
    }



    renduZoneLettre(){
        const {gagne,perdu} = this.state;

        if(gagne === true ){
            return  <div>
                <h1>Gagné !! </h1>
                <Redemarrer redemarrer={this.redemarrer}/>
            </div>
        }else if(perdu === true){
            return  <div>
                <h1>Tu as perdu, retente ta chance ! </h1>
                <Redemarrer redemarrer={this.redemarrer}/>
            </div>
        }
        else {
            return ALPHABET.map((lettre, index) => (
                <AlphabetLettre
                    lettreDejaClickee={this.state.lettreDejaClickee}
                    onClick={(e) => this.handleLettreClick(e, lettre)}
                    key={index}
                    lettre={lettre}/>
            ))
        }

    }


  render() {
        return (
              <div className="App">
                    <header className="App-header">
                        <h1 className="App-titre">Welcome to pendu with React</h1>
                    </header>
                    <div className="App-zoneMot">
                        <Mot mot={this.state.phraseCachee}/>
                    </div>
                    <div className="App-zoneLettre">
                         {this.renduZoneLettre()}
                    </div>
                    <div className="dessin">
                         <Stage width={window.innerWidth} height={window.innerHeight}>
                             <Canvas essaiRestant = {this.state.essaisManques}/>
                         </Stage>
                    </div>

              </div>
        );
  }
}

export default App;
