import { TestBed, async } from '@angular/core/testing';
import { NewRssComponent } from './new-rss.component';

describe('NewRssComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewRssComponent
      ],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(NewRssComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});