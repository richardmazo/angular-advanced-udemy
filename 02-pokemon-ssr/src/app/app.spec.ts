import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Navbar } from './shared/components/navbar/navbar';

@Component({
  selector: 'app-nav',
  template: `
    <nav class="test-class">
      <a href="test-link">Test Link</a>
    </nav>
  `,
})
class MockNavbarComponent {}

describe('App', () => {

  let fixture: ComponentFixture<App>;
  let app: App;

  beforeEach(async () => {
    //Opcion 1
    // await TestBed.configureTestingModule({
    //   imports: [App],
    //   providers: [ provideRouter([]) ]
    // }).compileComponents();

    //Opcion 2
    //   await TestBed.configureTestingModule({
    //     imports: [App],
    //     providers: [ provideRouter([]) ]
    // })
    // .overrideComponent(App, {
    //   add: {
    //     imports: [MockNavbarComponent]
    //   },
    //   remove: {
    //     imports: [Navbar]
    //   }
    // })
    // .compileComponents();

    //Opcion 3
    TestBed.overrideComponent(App, {
      set: {
        imports: [MockNavbarComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      },
    });

    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;

  });

  it('should render the navbar and router-outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should match snapshot', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.innerHTML).toMatchSnapshot();
  });

});
