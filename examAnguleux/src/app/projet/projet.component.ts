import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../services/projet-service';
import { Projet } from '../model/projet';
import { StockageLocalService } from '../services/stockage-local.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent implements OnInit {
  projet: Projet;

  constructor(private stockageLocalService : StockageLocalService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id: number = this.route.snapshot.params['id'];
    let projets: Projet[] = this.stockageLocalService.recupererProjets();
    let found: boolean = false;
    for(let elem of projets){
      if(elem.id == id){
        this.projet = elem;
        found = true;
      }
    }
  }

}
