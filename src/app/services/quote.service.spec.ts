import { QuoteService } from './quote.service';

describe('QuoteService', () => {
  let service: QuoteService;

  beforeEach(() => {
    service = new QuoteService();
  });

  it('should create a post in an array', () => {
    const qouteText = 'This is my first post';
    service.addNewQuote(qouteText);
    expect(service.quoteList.length).toBeGreaterThanOrEqual(1);
  });

  it('should remove a created post from the array of posts', () => {
    service.addNewQuote('This is my first post');
    service.removeQuote(0);
    expect(service.quoteList.length).toBeLessThan(1);
  });

  it('should return fetch from server', async () => {
    const result = await service.fetchQuotesFromServer();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
});