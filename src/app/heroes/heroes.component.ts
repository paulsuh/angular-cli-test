import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from "../message.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];
  selectedHero?: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`)
  }

  hero: Hero = {
    id: 1,
    name: 'Windstorm',
  };

  constructor(private heroService: HeroService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add( name: string ): void {
    name=name.trim();
    if (!name) { return; }
    this.heroService.addHero( {name} as Hero )
      .subscribe(hero => {
        this.pushHero(hero)
      });
  }

  pushHero( h: Hero ): void {
    console.log(h);
    this.heroes.push(h);
  }
}
