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

  observable1$! : Observable<string>;
  observable2$ : Observable<Array<string>> = of (["Obs2 - Data 1","Obs2 - Data 2", "Obs2 - Data 3"]);
  observable3$ : Observable<string> = from (["Obs3 - Data 1","Obs3 - Data 2", "Obs3 - Data 3"]);
  observable4$!: Observable<any>;
  observable5$! : Observable<any>;
 
  tabData : Array<String> = [];
  subscribe : any;

  tabLivre : Array<any> = [];

  ngOnInit(): void {

    this.observable1$ = new Observable (
      observer => {
        observer.next ("Data 1");
        observer.next ("Data 2");
        observer.next ("Data 3");
        observer.complete ();
      }
    )

    this.observable4$ = from ([
      {"titre":"linux","prix":10},
      {"titre":"windows","prix":15},
      {"titre":"angular","prix":5}]
    ); 
    
    this.observable4$.pipe (filter (livre => livre.prix > 10  )).subscribe (livre => {this.tabLivre.push (livre)});


  }
  onClick () {
    this.firstService.log ("click catalogue")

    if (this.subscribe) {
      console.log ("unsubscribe")
      this.subscribe.unsubscribe ();  
    }

    this.subscribe = this.observable1$.subscribe (
      {
        next : value => {this.tabData.push (value)},
        complete : () => {console.log ("complete")},
        error : err =>  {console.log (err)}
      }
    )
  } 

  onClickBackeng () {
    this.observable5$ = this.firstService.getCatalogue ();
  }
}
