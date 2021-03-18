import { Component, OnInit } from '@angular/core';
import {FirstService} from '../service/first.service';
import {Observable,of,from} from 'rxjs';
import {filter} from 'rxjs/operators';
import { serializeNodes } from '@angular/compiler/src/i18n/digest';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})

export class CatalogueComponent implements OnInit {

  dataset = ['MDB', 'Angular', 'Bootstrap', 'Framework', 'SPA', 'React', 'Vue'];

  searchText : string = "";

  constructor(private firstService : FirstService)  { }

  observable4$!: Observable<any>;
  observable5$!: Observable<any>;
 
  tabData : Array<String> = [];
  subscribe : any;

  tabLivre : Array<any> = [];

  ngOnInit(): void {
    this.observable4$ = from ([
      {"titre":"linux","prix":10},
      {"titre":"windows","prix":15},
      {"titre":"angular","prix":5},
      {"titre":"talend","prix":0}]
    );
  }

  onClick() {
    //this.firstService.log("click catalogue")

    if (this.subscribe) {
      //console.log ("unsubscribe")
      this.subscribe.unsubscribe ();
    }

    this.subscribe = this.observable4$.subscribe (
      {
        next : value => { this.tabData.push("Produit : " + value.titre + ", prix:  " + value.prix) },
        complete : () => { console.log ("complete") },
        error : err =>  { console.log(err) }
      }
    )
  } 

  onClickBackend() {
    this.observable5$ = this.firstService.getCatalogue();
  }
}