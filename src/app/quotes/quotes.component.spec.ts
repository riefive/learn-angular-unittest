/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { QuotesComponent } from './quotes.component';
import { QuoteModel, QuoteService } from '../services/quote.service';

describe('QuotesComponent', () => {
  let component: QuotesComponent;
  let fixture: ComponentFixture<QuotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [QuotesComponent]
    });
    fixture = TestBed.createComponent(QuotesComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create Quote component', () => {
    expect(component).toBeTruthy();
  });

  it('should use the quoteList from the service', () => {
    const quoteService = fixture.debugElement.injector.get(QuoteService);
    fixture.detectChanges();
    expect(quoteService.getQuote()).toEqual(component.quoteList);
  });

  it('should create a new post', () => {
    component.quoteText = 'I love this test';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.innerHTML).toContain('I love this test');
  });

  it('should disable the button when textArea is empty', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should enable button when textArea is not empty', () => {
    component.quoteText = 'I love this test';
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('should remove post upon card click', () => {
    component.quoteText = 'This is a fresh post';
    fixture.detectChanges();

    fixture.debugElement
      .query(By.css('.row'))
      .query(By.css('.card'))
      .triggerEventHandler('click', null);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.innerHTML).toContain('This is a fresh post');
  });

  it('should fetch data asynchronously', async () => {
    const fakedFetchedList = [
      new QuoteModel('I love unit testing', 'Mon 4, 2018')
    ];
    const quoteService = fixture.debugElement.injector.get(QuoteService);
    spyOn(quoteService, 'fetchQuotesFromServer').and.returnValue(
      Promise.resolve(fakedFetchedList)
    );
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.fetchedList).toBe(fakedFetchedList);
    });
  });

  it('should add a post', () => {
    const quoteService = fixture.debugElement.injector.get(QuoteService);
    const qouteText = 'This is my first post';
    quoteService.addNewQuote(qouteText);
    fixture.detectChanges();
    component.quoteText = 'I like pizza!';
    component.createNewQuote();
    expect(quoteService.quoteList.length).toBeGreaterThan(1);
  });

  it('should remove a post', () => {
    const quoteService = fixture.debugElement.injector.get(QuoteService);
    const qouteText = 'This is my first post';
    quoteService.addNewQuote(qouteText);
    fixture.detectChanges();
    component.removeQuote(0);
    expect(quoteService.quoteList.length).toBeLessThan(1);
  });
});