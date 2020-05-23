import { Injectable } from '@angular/core';
import { Projet } from '../model/projet';
@Injectable({
  providedIn: 'root'
})
export class StockageLocalService {

  constructor() { }

  projets: object[];

  recupererProjets(){
    try{
      if(localStorage.projets != null){
        return JSON.parse(localStorage.projets);
      }else{
        return [];
      }
    }catch(error){
      console.error("Impossible de recuperer le localStorage", error);
      return null;
    }
  }
  stockerProjet(projet:Projet){
    try{
      this.projets = this.recupererProjets();
      this.projets.push(projet);
      localStorage.projets = JSON.stringify(this.projets);
    }catch(error){
      console.error("Impossible de persister dans localStorage", error);
    }

  }
}
