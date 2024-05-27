import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoonlijkeInfoComponent } from './persoonlijke-info.component';

describe('PersoonlijkeInfoComponent', () => {
  let component: PersoonlijkeInfoComponent;
  let fixture: ComponentFixture<PersoonlijkeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersoonlijkeInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersoonlijkeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
