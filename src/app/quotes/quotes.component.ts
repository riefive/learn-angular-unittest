import { Component, OnInit } from '@angular/core';
import { QuoteModel, QuoteService } from '../services/quote.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  public quoteList: QuoteModel[] = [];
  public fetchedList: QuoteModel[] = [];
  public quoteText: String = "";

  constructor(private service: QuoteService) {}

  ngOnInit(): void {
    this.quoteList = this.service.getQuote();
    this.service.fetchQuotesFromServer().then((data:QuoteModel[]) => {
      this.fetchedList = data;
    });
  }

  createNewQuote() {
    this.service.addNewQuote(this.quoteText);
    this.quoteText = "";
  }

  removeQuote(index:number) {
    this.service.removeQuote(index);
  }
}
