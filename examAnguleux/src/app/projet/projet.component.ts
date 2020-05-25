import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../services/projet-service';
import { Projet } from '../model/projet';
import { StockageLocalService } from '../services/stockage-local.service';
import { ActivatedRoute } from '@angular/router';
import { Tache } from '../model/tache';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent implements OnInit {

  projet: Projet;
  taches: Tache[];
  idTache: number;

  constructor(private stockageLocalService : StockageLocalService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id: number = this.route.snapshot.params['id'];
    let projets: Projet[] = this.stockageLocalService.recupererProjets();
    let toutestaches: Tache[] = this.stockageLocalService.recupererTaches();
    this.idTache = toutestaches.length-1;
    let found: boolean = false;

    for(let projet of projets){
      if(projet.id == id){
        this.projet = projet;
        found = true;
      }

    }
    this.taches = [];
    if( id == 0){
      this.taches = toutestaches;
    }else{
      if( id == 1){
        toutestaches.forEach(task => {
          if(task.idProjet == id || task.idProjet == -1){
            this.taches.push(task);
          }
        });
      }else{
        toutestaches.forEach(task => {
          if(task.idProjet == id){
            this.taches.push(task);
          }
        });
      }
    }


  }



  ajouterTache(titreTache,idProjet){
    let nouvelleTache = {
      id : this.idTache+1,
      titre : titreTache.value,
      estDemarre : false,
      temps : 0,
      dates: [],
      idProjet: idProjet
    }

    this.taches.push(nouvelleTache)
    this.stockageLocalService.stockerTache(nouvelleTache);
    titreTache.value = '';
    this.idTache++;

  }




}
