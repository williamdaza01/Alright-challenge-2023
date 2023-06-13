import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReviewesComponent } from './my-reviewes.component';

describe('MyReviewesComponent', () => {
  let component: MyReviewesComponent;
  let fixture: ComponentFixture<MyReviewesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyReviewesComponent]
    });
    fixture = TestBed.createComponent(MyReviewesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
