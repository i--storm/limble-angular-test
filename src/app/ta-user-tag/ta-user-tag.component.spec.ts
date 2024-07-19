import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaUserTagComponent } from './ta-user-tag.component';

describe('TaUserTagComponent', () => {
  let component: TaUserTagComponent;
  let fixture: ComponentFixture<TaUserTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaUserTagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaUserTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
