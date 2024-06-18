import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OffreDetailComponentPage } from './offre-detail-component.page';

describe('OffreDetailComponentPage', () => {
  let component: OffreDetailComponentPage;
  let fixture: ComponentFixture<OffreDetailComponentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OffreDetailComponentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
