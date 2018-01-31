import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-infinite-scroll',
  templateUrl: 'infinite-scroll.html',
})
export class InfiniteScrollPage {
  public shows: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    this.loadMore();
  }

  loadMore() {
    this.http.get<any[]>('http://api.tvmaze.com/shows?page=' + 1)
      .subscribe(results => {
        this.shows = this.shows.concat(results.splice(0, 10));
      });
  }

  
}
