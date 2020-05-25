import { Component, OnInit } from '@angular/core';
import { StockageLocalService } from '../services/stockage-local.service';
import { Tache } from '../model/tache';

@Component({
  selector: 'app-quick-tache',
  templateUrl: './quick-tache.component.html',
  styleUrls: ['./quick-tache.component.scss']
})
export class QuickTacheComponent implements OnInit {

  taches: Tache[];
  idTache: number;

  constructor(private stockageLocalService: StockageLocalService) { }

  ngOnInit(): void {
    let toutestaches: Tache[] = this.stockageLocalService.recupererTaches();
    this.idTache = toutestaches.length-1;
    this.taches = [];
    toutestaches.forEach(task => {
      if(task.idProjet == -1){
        this.taches.push(task);
      }
    });


  }

  ajouterQuickTache(titreTache){
    if(titreTache.value.length > 1){
      let nouvelleTache = {
        id : this.idTache+1,
        titre : titreTache.value,
        estDemarre : false,
        temps : 0,
        dates: [],
        idProjet: -1
      }

      this.taches.push(nouvelleTache)
      this.stockageLocalService.stockerTache(nouvelleTache);
      titreTache.value = '';
      this.idTache++;
    }


  }

  supprimerQuickTache(id){
    for(var i=0; i <= this.taches.length-1 ; i++){
        if(this.taches[i].id == id){
          this.taches.splice(i,1);
        }
      }
      this.stockageLocalService.supprimerTache(id);
  }



}
