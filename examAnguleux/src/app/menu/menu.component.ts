import { Component, OnInit } from '@angular/core';
import { Projet } from '../model/projet';
import { StockageLocalService } from '../stockage-local.service';
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
    }
    this.idProjet = this.projets.length;


  }

  ajouterProjet(titreProjet){
    let newProjet = {
      id: 2,
      titre: titreProjet.value
    }
    this.projets.push(newProjet);
    this.stockageLocalService.stockerProjet(newProjet);
    titreProjet.value = '';
  }

}
