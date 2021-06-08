import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscolaPage } from './escola.page';

describe('EscolaPage', () => {
  let component: EscolaPage;
  let fixture: ComponentFixture<EscolaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscolaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EscolaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
