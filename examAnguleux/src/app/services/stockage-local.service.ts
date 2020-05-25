import { Injectable, OnInit } from '@angular/core';
import { Projet } from '../model/projet';
import { Tache } from '../model/tache';
@Injectable({
  providedIn: 'root'
})
export class StockageLocalService {

  constructor() { }


  projets: Projet[];

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
  supprimerProjet(id: number){
    try{

      this.projets = this.recupererProjets();
      this.taches = this.recupererTaches();
      for(var i=0; i <= this.projets.length-1 ; i++){
          if(this.projets[i].id== id){
            this.projets.splice(i,1);
          }
        }
        var i = 0;
        var taille = this.taches.length-1;
        while(i <= taille){
          if(this.taches[i].idProjet== id){
            this.taches.splice(i,1);
            i--;
            taille--;
          }else{
            i++;
          }

        }
      localStorage.projets = JSON.stringify(this.projets);
      localStorage.taches = JSON.stringify(this.taches);
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
      this.taches.sort((a,b)=> (a.id > b.id )? 1:-1);
      localStorage.taches = JSON.stringify(this.taches);
    }catch(error){
      console.error("Impossible de persister dans localStorage", error);
    }

  }

  supprimerTache(id: number){
    try{
      this.taches = this.recupererTaches();
      for(var i=0; i <= this.taches.length-1 ; i++){
          if(this.taches[i].id== id){
            this.taches.splice(i,1);
          }
        }
      localStorage.taches = JSON.stringify(this.taches);
    }catch(error){
      console.error("Impossible de persister dans localStorage", error);
    }

  }
}
