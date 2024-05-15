import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedleComponent } from './pokedle.component';

describe('PokedleComponent', () => {
  let component: PokedleComponent;
  let fixture: ComponentFixture<PokedleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokedleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
