import { Component, OnInit } from '@angular/core';
import { Projet } from '../model/projet';
import { Tache } from '../model/tache';
import { StockageLocalService } from '../services/stockage-local.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  projets : Projet[];
  idProjet : number;
  taches : Tache[];
  tempsTotalsec : number;
  tempsTotalmin : number;
  tempsTotalh : number;


  constructor( private stockageLocalService : StockageLocalService) { }

  ngOnInit(): void {
    this.projets = this.stockageLocalService.recupererProjets();
    if(this.projets.length == 0){
      this.projets = [
        {
          id: 0, titre : "Toutes les tâches", isEdit : false
        },
        {
          id: 1, titre : "Tâches unique", isEdit : false
        }
      ]
      this.stockageLocalService.stockerProjet(this.projets[0]);
      this.stockageLocalService.stockerProjet(this.projets[1]);
    }
    this.idProjet = this.projets.length;
    this.taches = this.stockageLocalService.recupererTaches();
    let tempsTotal: number = 0;
    for(var i=0; i <= this.taches.length-1 ; i++){
      tempsTotal = tempsTotal + this.taches[i].temps;
    }
    this.tempsTotalh = Math.floor(tempsTotal/3600);
    tempsTotal = tempsTotal%3600;
    this.tempsTotalmin = Math.floor(tempsTotal/60);
    tempsTotal = tempsTotal%60;
    this.tempsTotalsec = tempsTotal;


  }

  ajouterProjet(titreProjet){
    console.log(titreProjet.value.length);
    if(titreProjet.value.length > 1){
      let newProjet = {
        id: this.idProjet,
        titre: titreProjet.value,
        isEdit: false
      }
      this.idProjet++;
      this.projets.push(newProjet);
      this.stockageLocalService.stockerProjet(newProjet);
      titreProjet.value = '';
    }

  }

  supprimerProjet(id :number){
    for(var i=0; i <= this.projets.length-1 ; i++){
        if(this.projets[i].id == id){
          this.projets.splice(i,1);
        }
      }
      this.stockageLocalService.supprimerProjet(id);

  }

  editerTrue(id: number){
    for(var i=0; i <= this.projets.length-1 ; i++){
        if(this.projets[i].id == id){
          this.projets[i].isEdit = !this.projets[i].isEdit;
          break;
        }
      }
  }
  editerProjet(id: number,titreProjetEdit){
    for(var i=0; i <= this.projets.length-1 ; i++){
        if(this.projets[i].id == id){
          this.projets[i].titre = titreProjetEdit.value;
          this.projets[i].isEdit = false;
          this.stockageLocalService.supprimerProjet(id)
          this.stockageLocalService.stockerProjet(this.projets[i]);
          break;
        }
      }

      titreProjetEdit.value = '';
  }


}
