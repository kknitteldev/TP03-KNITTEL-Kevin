import { Component, OnInit } from '@angular/core';
import {FirstService} from '../service/first.service';
import {Observable,of,from} from 'rxjs';
import {filter} from 'rxjs/operators';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  constructor(private firstService : FirstService)  { }

  observable4$!: Observable<any>;
  observable5$! : Observable<any>;
 
  tabData : Array<String> = [];
  subscribe : any;

  tabLivre : Array<any> = [];

  ngOnInit(): void {

   

    this.observable4$ = from ([
      {"titre":"linux","prix":10},
      {"titre":"windows","prix":15},
      {"titre":"angular","prix":5}]
    ); 
    
    //this.observable4$.pipe (filter (livre => livre.prix > 10  )).subscribe (livre => {this.tabLivre.push (livre)});


  }
  onClick () {
    this.firstService.log ("click catalogue")

    if (this.subscribe) {
      console.log ("unsubscribe")
      this.subscribe.unsubscribe ();  
    }

    this.subscribe = this.observable4$.subscribe (
      {
        next : value => {this.tabData.push ("Produit : "+value.titre+", prix:  "+value.prix)},
        complete : () => {console.log ("complete")},
        error : err =>  {console.log (err)}
      }
    )
  } 

  onChange() {
    console.log(this);
  }

  onClickBackeng () {
    this.observable5$ = this.firstService.getCatalogue ();
  }
}
