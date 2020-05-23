import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../services/projet-service';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent implements OnInit {
  id: number;
  titre: string;
  tache : Tache[];

  constructor(private projetService: ProjetService) { }

  ngOnInit(): void {
  }

}
