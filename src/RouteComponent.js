import React, {Component} from 'react';

import App from './App';
import {Route} from 'react-router-dom'


import axios from 'axios';



class RouteComponent extends Component {


    render() {

        const
            LIENS = [
                {route: "/noms", dicoActif: "noms", autresDico:["villes","prenoms"]},
                {route: "/villes", dicoActif: "villes", autresDico:["noms","prenoms"]},
                {route: "/prenoms", dicoActif: "prenoms", autresDico:["noms","villes"]},

            ];


        const
            listeDicoRouter = LIENS.map((element, i) => (
                <Route key={i} path={element.route} dicoActif={element.dicoActif} autresDico={element.autresDico}/>
            ));

        return (
            <App tabRoute={listeDicoRouter}/>
        );
    }

}


export default RouteComponent;
