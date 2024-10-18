import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MateriaisPage } from './materiais.page';

describe('MateriaisPage', () => {
  let component: MateriaisPage;
  let fixture: ComponentFixture<MateriaisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
