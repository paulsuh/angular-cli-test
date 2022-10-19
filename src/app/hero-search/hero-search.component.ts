import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from "rxjs";

import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

import { Hero } from "../hero";
import { HeroService } from "../hero.service";

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(

      // wait 300ms after each keystroke
      debounceTime(300),

      // ignore if new term is same as old one
      distinctUntilChanged(),

      // switch to new Observable each time search term changes
      switchMap((term:string) => this.heroService.searchHeroes(term))
    )
  }

}
