import { Injectable } from '@angular/core';
import { Projet } from '../model/projet';
import { Tache } from '../model/tache';
@Injectable({
  providedIn: 'root'
})
export class StockageLocalService {

  constructor() { }

  projets: object[];
  taches: Tache[];

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

  recupererTaches(){
    try{
      if(localStorage.taches != null){
        return JSON.parse(localStorage.taches);
      }else{
        return [];
      }
    }catch(error){
      console.error("Impossible de recuperer le localStorage", error);
      return null;
    }
  }

  stockerTache(tache:Tache){
    try{
      this.taches = this.recupererTaches();
      this.taches.push(tache);
      localStorage.taches = JSON.stringify(this.taches);
    }catch(error){
      console.error("Impossible de persister dans localStorage", error);
    }

  }
}
