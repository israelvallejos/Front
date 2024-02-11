import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { NewsService } from '../news.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let newsServiceMock: any;

  beforeEach(async () => {
    newsServiceMock = jasmine.createSpyObj('NewsService', ['getLatestNews']);
  
    
    newsServiceMock.getLatestNews.and.returnValue(of([]));
  
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        { provide: NewsService, useValue: newsServiceMock }
      ],
      imports: [
        HttpClientTestingModule,
        MatPaginatorModule,
        FormsModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
