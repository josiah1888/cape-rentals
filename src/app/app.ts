import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app',
  template: 'Hello Universal App Data: {{data}}'
})
export class App {
  public data: string = 'initial string';
  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get('http://jsonplaceholder.typicode.com/posts/1')
      .subscribe(i => {
        const title = i.json().title;
        console.log('I did it, found this: ', title)
        this.data = title;
      });
  }
}
