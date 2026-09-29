import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokemonList } from "../../pokemons/components/pokemon-list/pokemon-list";
import { PokemonListSkeleton } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonList, PokemonListSkeleton, RouterLink],
  templateUrl: './pokemons-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPage {

  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map(params => params['page'] ?? '1' ),
      map(page => ( isNaN(+page) ? 1 : +page )),
      map(page => Math.max(1, page))
    )
  );

  public loadOnPageChanged = effect(() => {
    this.loadPokemos(this.currentPage());
  }, {
    allowSignalWrites: true
  })

  public loadPokemos(page: number = 0): void {

    const pageToLoad = this.currentPage()! + page;

    this.pokemonsService.loadPage(pageToLoad)
    .pipe(
      tap( () => this.title.setTitle(`Pokemons - Page ${pageToLoad}`) )
    )
    .subscribe({
      next: (pokemons) => {
        this.pokemons.set(pokemons);
      },
      error: (error) => {
        console.error('Error loading pokemons:', error);
      }
    });
  }

}
