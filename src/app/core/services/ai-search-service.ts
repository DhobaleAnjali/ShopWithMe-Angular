// ai-search.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { aiConfig } from '../config/aiConfig';

@Injectable({
  providedIn: 'root',
})
export class AiSearchService {
  private http = inject(HttpClient);

  private apiKey = '';

  search(query: string) {
    const body = {
      model: 'openai/gpt-oss-120b',
      messages: [
        {
          role: 'system',
          content: `
You are an ecommerce search assistant.

Available categories:

- beauty
- fragrances
- furniture
- mens-shirts
- mens-shoes
- womens-dresses
- womens-watches
- groceries

Rules:

1. Convert shopping text into JSON
2. category must be ONLY one of the categories above
3. Detect gender words like men, male, boys, women, female, girls
4. If user mentions gender, map to closest matching category
5. If user says only shoes/watch/shirt/dress without gender, keep category as ""
Category mapping rules:

- women shoes → womens-dresses
- women watch → womens-watches
- men shoes → mens-shoes
- men shirt → mens-shirts
6. Extract brand if present
7. Extract color if present
8. Extract price limit into maxPrice
9. Put product names, item names, and remaining meaningful search words into purpose
10. If a word does not match category/brand/color, do NOT discard it — put it into purpose
11. Examples:
   - mascara → purpose:"mascara"
   - sports → purpose:"sports"
   - sports shoes → purpose:"sports shoes"
   - black gown → purpose:"gown"
   - perfume → purpose:"perfume"

12. Empty values should be ""
13. maxPrice must be number not string
14. Return ONLY JSON
15. No explanation text
16. Do not invent products or categories
17. assistantMessage should contain one short shopping recommendation sentence

Return exactly:
{
  "category":"",
  "brand":"",
  "color":"",
  "purpose":"",
  "maxPrice":0,
  "assistantMessage":""
}
`,
        },
        {
          role: 'user',
          content: query,
        },
      ],
      temperature: 0,
    };

    return this.http.post('https://api.groq.com/openai/v1/chat/completions', body, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  summarizeReviews(reviewsText: string) {
    const body = {
      model: 'openai/gpt-oss-120b',
      messages: [
        {
          role: 'system',
          content: `
You are a product review summarizer.

Analyze the reviews and return ONLY JSON.

Format:

{
  "pros":"",
  "cons":"",
  "overall":""
}

Rules:

1. pros = one short sentence
2. cons = one short sentence
3. overall = one-line overall sentiment
4. No arrays
5. No markdown
6. No explanation text

Keep it short and clear.
`,
        },
        {
          role: 'user',
          content: reviewsText,
        },
      ],
      temperature: 0,
    };

    return this.http.post('https://api.groq.com/openai/v1/chat/completions', body, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  compareProducts(product1: any, product2: any) {
    const body = {
      model: 'openai/gpt-oss-120b',
      messages: [
        {
          role: 'system',
          content: `
You are an ecommerce AI comparison assistant.

Return ONLY JSON.

Format:

{
 "pros":"",
 "cons":"",
 "winner":"",
 "bestFor":""
}

Rules:
1. Compare products using title, description, price and rating
2. pros should be one short line
3. cons should be one short line
4. winner should contain only product title
5. bestFor should be one short recommendation line
6. No markdown
7. No explanation text
`,
        },
        {
          role: 'user',
          content: `
Product A:
${JSON.stringify(product1)}

Product B:
${JSON.stringify(product2)}
`,
        },
      ],
      temperature: 0,
    };

    return this.http.post('https://api.groq.com/openai/v1/chat/completions', body, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }
}
