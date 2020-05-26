import { Component, OnInit,Input } from '@angular/core';
import { StockageLocalService } from '../services/stockage-local.service';
import { interval, Subscription } from 'rxjs';
import { Tache } from '../model/tache';
import { Projet } from '../model/projet';

@Component({
  selector: 'app-chrono-tache',
  templateUrl: './chrono-tache.component.html',
  styleUrls: ['./chrono-tache.component.scss']
})
export class ChronoTacheComponent implements OnInit {

  @Input() tache:Tache;

  taches: Tache[];
  projets: Projet[];
  idTache: number;
  compteur: number[];
  dateActive: Date[];
  subsTemps : Subscription[] = [];

  selectedProjetId: number;
  isChangerProjet: boolean;


  constructor(private stockageLocalService: StockageLocalService) { }

  ngOnInit(): void {
    this.taches = this.stockageLocalService.recupererTaches();
    this.projets = this.stockageLocalService.recupererProjets();
    this.idTache = this.taches.length-1;
    this.taches.forEach(element => {
      this.subsTemps.push(new Subscription);
    });
    this.compteur = [];
    this.dateActive = [];

  }

  ajouterTache(titreTache){
    if(titreTache.value.length > 1){
      let nouvelleTache = {
        id : this.idTache+1,
        titre : titreTache.value,
        estDemarre : false,
        temps : 0,
        dates: [],
        idProjet: 1,
      }

      this.taches.push(nouvelleTache)
      this.stockageLocalService.stockerTache(nouvelleTache);
      titreTache.value = '';
      this.idTache++;
    }


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

      this.stockageLocalService.supprimerTache(tache.id);
      this.stockageLocalService.stockerTache(tache);



    }
  }

  tempsDynamique(tache){
    let i = this.taches.indexOf(tache);
    return (this.compteur[i])%60?tache.temps+this.compteur[i]:tache.temps;
  }

  tempsM(temps){
    let tempsM = 0;
    tempsM = Math.floor(temps/60);
    tempsM = tempsM%60;
    return tempsM;
  }

  tempsH(temps){
    let tempsH = 0;
    tempsH = Math.floor(temps/3600);
    tempsH = tempsH%3600;
    return tempsH;
  }

  supprimerTache(id){
    for(var i=0; i <= this.taches.length-1 ; i++){
        if(this.taches[i].id == id){
          this.taches.splice(i,1);
        }
      }
      this.stockageLocalService.supprimerTache(id);
      location.reload();
  }

  editChangerProjet(){
    this.isChangerProjet = !this.isChangerProjet;
  }

  changerProjet(){
    if(this.selectedProjetId != 0 || this.selectedProjetId != null){
      for(var i=0; i <= this.taches.length-1 ; i++){
          if(this.taches[i].id == this.idTache){
            this.stockageLocalService.supprimerTache(this.idTache);
            let newTache : Tache = this.taches[i];
            this.taches.splice(i,1);
            newTache.idProjet = this.selectedProjetId;
            this.taches.push(newTache)
            this.stockageLocalService.stockerTache(newTache);
            location.reload();

          }
        }

    }
  }

}
