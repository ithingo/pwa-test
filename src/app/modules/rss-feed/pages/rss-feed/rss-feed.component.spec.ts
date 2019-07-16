import { TestBed, async } from '@angular/core/testing';
import { RssFeedComponent } from './rss-feed.component';

describe('RssFeedComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RssFeedComponent
      ],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(RssFeedComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});