import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookerTestformComponent } from './looker-testform.component';

describe('LookerTestformComponent', () => {
  let component: LookerTestformComponent;
  let fixture: ComponentFixture<LookerTestformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LookerTestformComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LookerTestformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
