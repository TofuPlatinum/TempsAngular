import { Component, OnInit } from '@angular/core';
import { Projet } from '../model/projet';
import { StockageLocalService } from '../services/stockage-local.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  projets : Projet[];
  idProjet : number;
  constructor( private stockageLocalService : StockageLocalService) { }

  ngOnInit(): void {
    this.projets = this.stockageLocalService.recupererProjets();
    if(this.projets.length == 0){
      this.projets = [
        {
          id: 0, titre : "Toutes les tâches"
        },
        {
          id: 1, titre : "Tâches unique"
        }
      ]
      this.stockageLocalService.stockerProjet(this.projets[0]);
      this.stockageLocalService.stockerProjet(this.projets[1]);
    }
    this.idProjet = this.projets.length;


  }

  ajouterProjet(titreProjet){
    console.log(titreProjet.value.length);
    if(titreProjet.value.length > 1){
      let newProjet = {
        id: this.idProjet,
        titre: titreProjet.value
      }
      this.idProjet++;
      this.projets.push(newProjet);
      this.stockageLocalService.stockerProjet(newProjet);
      titreProjet.value = '';
    }

  }

}
