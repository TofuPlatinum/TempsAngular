export class Tache {
  id: number;
  titre: string;
  estDemarre: boolean;
  temps: number;
  dates : CoupleDates[];
}

type CoupleDates = [Date,Date];
