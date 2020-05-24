export class Tache {
  id: number;
  titre: string;
  estDemarre: boolean;
  temps: number;
  dates : CoupleDates[];
  idProjet:number;
}

type CoupleDates = [Date,Date];
