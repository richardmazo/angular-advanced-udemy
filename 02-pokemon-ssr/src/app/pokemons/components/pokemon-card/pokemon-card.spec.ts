import { provideRouter } from '@angular/router';
import { PokemonCard } from './pokemon-card';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimplePokemon } from '../../interfaces';
import { By } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'Bulbasaur',
};

describe('PokemonCardComponent', () => {
  let component: PokemonCard;
  let fixture: ComponentFixture<PokemonCard>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PokemonCard],
      providers: [provideRouter([])],
    });

    fixture = TestBed.createComponent(PokemonCard);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('pokemon', mockPokemon);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the SimplePokemon signal input', () => {
    expect(component.pokemon()).toStrictEqual(mockPokemon);
  });

  it('should compute the correct pokemin image URL', () => {
    const expectedUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`;
    expect(component.pokemonImage()).toBe(expectedUrl);
  });

  it('should render the pokemon name and image correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const nameElement = compiled.querySelector('h2');
    const imgElement = compiled.querySelector('img');

    expect(nameElement?.textContent.trim()).toBe(mockPokemon.name);
    expect(imgElement?.src).toBe(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`,
    );

    expect(imgElement?.alt).toBe(mockPokemon.name);
  });

  it('should have the correct routeLink configuration', () => {
    const debugElement = fixture.debugElement.query(By.directive(RouterLink));
    const routerLinkInstance = debugElement.injector.get(RouterLink);
    const expectedUrl = `/pokemons/${mockPokemon.name}`;
    expect(routerLinkInstance.urlTree?.toString()).toEqual(expectedUrl);
  });
});
