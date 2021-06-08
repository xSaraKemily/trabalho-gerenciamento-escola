import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlunosPage } from './aluno.page';

describe('AlunoPage', () => {
  let component: AlunosPage;
  let fixture: ComponentFixture<AlunosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlunosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlunosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
