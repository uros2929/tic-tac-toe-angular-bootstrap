import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageOfGamesComponent } from './storage-of-games.component';

describe('StorageOfGamesComponent', () => {
  let component: StorageOfGamesComponent;
  let fixture: ComponentFixture<StorageOfGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageOfGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageOfGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
