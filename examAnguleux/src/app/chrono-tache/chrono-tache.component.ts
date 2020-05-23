import { Component, OnInit } from '@angular/core';
import { StockageLocalService } from '../services/stockage-local.service';
import { interval, Subscription } from 'rxjs';
import { Tache } from '../model/tache';

@Component({
  selector: 'app-chrono-tache',
  templateUrl: './chrono-tache.component.html',
  styleUrls: ['./chrono-tache.component.scss']
})
export class ChronoTacheComponent implements OnInit {

  taches: Tache[];
  idTache: number;
  compteur: number[];
  dateActive: Date[];
  subsTemps : Subscription[] = [];


  constructor(private stockageLocalService: StockageLocalService) { }

  ngOnInit(): void {
    this.taches = this.stockageLocalService.recupererTaches();
    this.idTache = this.taches.length;
    this.taches.forEach(element => {
      this.subsTemps.push(new Subscription);
    });
    this.compteur = [];
    this.dateActive = [];

  }

  ajouterTache(titreTache){
    let nouvelleTache = {
      id : this.idTache+1,
      titre : titreTache.value,
      estDemarre : false,
      temps : 0,
      dates: []
    }

    this.taches.push(nouvelleTache)
    this.stockageLocalService.stockerTache(nouvelleTache);
    titreTache.value = '';
    this.idTache++;

  }

  demarrerStopperTache(tache:Tache){
    tache.estDemarre = ! tache.estDemarre
    let indice = this.taches.indexOf(tache);
    if(tache.estDemarre){
      this.subsTemps[indice] = interval(1000).subscribe((valeur:number)=>{this.compteur[indice] = valeur});
      this.dateActive[indice] = new Date();
    }else{
      tache.temps = tache.temps + this.compteur[indice];
      this.compteur[indice] = 0;
      this.subsTemps[indice].unsubscribe();
      let maintenant = new Date();
      tache.dates.push([this.dateActive[indice],maintenant]);
      this.dateActive[indice] = null;
    }
  }

  tempsDynamique(tache,i){
    return (this.compteur[i])?tache.temps+this.compteur[i]:tache.temps;
  }

}
