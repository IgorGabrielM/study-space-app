import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpSimpilifyPage } from './sign-up-simpilify.page';

describe('SignUpSimpilifyPage', () => {
  let component: SignUpSimpilifyPage;
  let fixture: ComponentFixture<SignUpSimpilifyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpSimpilifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
