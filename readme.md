# Instructies Demo
Start je project met _ionic serve_

## CSS Componenten
1. We gebruiken CSS componenten dus openen we ook die pagina.
2. Toon de _css-components.ts_ en laat zien dat we wat courses hebben.
3. Hier gaan we een lijstje en selectie voor opstellen.
4. Open _css-components.html_
5. We maken hier een lijst in en willen radio buttons tonen.  
   Merk op dat we (vrijwel) alleen maar ION tags hebben.
```html
<ion-list>
	<ion-item *ngFor="let course of courses">
	<ion-avatar item-start>
		<img [src]="course.imageUrl" />
	</ion-avatar>
	<ion-label>{{ course.name }}</ion-label>
	<ion-radio [disabled]="!course.enabled"></ion-radio>
	</ion-item>
</ion-list>
```
6. Toon je pagina en zie dat je al een mooie lijst hebt.
7. Open _themes/variables.css_ en plak het volgende:  
```scss
$radio-md-color-on: #008000;
$radio-md-transition-duration: 3000ms;
$radio-md-disabled-opacity: 0.1;
```
   Dit is te vinden op https://ionicframework.com/docs/api/components/radio/RadioButton/ (Je ziet daar de sass variablen die je kan aanpassen).  
   Zie het resultaat, custom kleurtje en timing en opacity.

8. Deze items hebben ook custom events. Voeg in de _ion-radio_ regel toe: 
```html
(ionSelect)="selectCourse(course)
```
9. Voeg in _css-components.ts_ de code toe om een course te selecteren:
```typescript
selectCourse(course: any) { this.selectedCourse = course; }
```
10. In _css-components.html_ kunnen we nu mooi de selected course laten zien:
```html
<ion-card *ngIf="selectedCourse">
	<ion-card-content>
	<ion-card-title>
		{{ selectedCourse.name }}
	</ion-card-title>
	<img [src]="selectedCourse.imageUrl" />
	<p> {{ selectedCourse.details }} </p>
	</ion-card-content>
</ion-card>
```
11. Bonus:  
    We kunnen ook een mooie zoekbalk maken om het compleet te maken.
- _css-components.ts_ een zoekfunctie maken:
```typescript
filterCourses(event: any) {
  if (!event.target.value) {
    this.courses = this.allCourses;
  } else {
    let search: string = event.target.value.toUpperCase();
    this.courses = this.allCourses.filter(course => {
      return course.name.indexOf(search) >= 0;
    });
  }
}
```
- _css-components.html_ een zoekbalk maken en de functie aanroepen:
```html
<ion-searchbar (ionInput)="filterCourses($event)"></ion-searchbar>
```

## API componenten
1. We kunnen ook componenten gebruiken die het ons gemakkelijker maken.
2. Voorbeelden zijn bijvoorbeeld infinite scroll, reorder en virtual scroll

### Infinite scroll
3. Voeg onder aan de lijst in _infinite-scroll.ts_ toe:
```html
<ion-infinite-scroll (ionInfinite)="loadMore($event)">
  <ion-infinite-scroll-content>Loading more shows...</ion-infinite-scroll-content>
</ion-infinite-scroll>
```
4. Om dit te laten werken moeten we meer kunnen inladen. Onze loadMore functie moet dan aangepast worden:  
   **Merk op:** De API die we gebruiken kan alleen per 250 laden, wij beperken het tonen tot 10 per keer.  
   **Merk op 2:** We moeten infiniteScroll.complete() aanroepen om de loading bar weg te laten gaan.
```typescript
static pageSize: number = 250;
static loadItemsPer: number = 10;

private currentItemIndex: number = 0;
loadMore(infiniteScroll: any = undefined) {
  let pageNumber = this.currentItemIndex / InfiniteScrollPage.pageSize;
  let itemIndexInPage = this.currentItemIndex % InfiniteScrollPage.pageSize;
  this.currentItemIndex += InfiniteScrollPage.loadItemsPer;

  this.http.get<any[]>('http://api.tvmaze.com/shows?page=' + pageNumber)
    .subscribe(results => {
      this.shows = this.shows.concat(results.splice(itemIndexInPage, InfiniteScrollPage.loadItemsPer));
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
    });
}
```

### Virtual scroll
5. Virtual scroll zorgt voor meer performance, alleen de items in beeld worden gerendered en dit scheelt dus RAM.
6. Je gebruikt nu geen _*ngFor_ meer maar de virtualScroll van Ionic:
7. Op je lijst komt:
```html
<ion-list [virtualScroll]="shows">
```
8. Op je item komt dan het volgende:
```html
<ion-item *virtualItem="let show">
```

### Bonus: Reordering items
10. Om maar aan te geven hoe rijk het framework is nog één item, zelf kunnen slepen.
11. Verander je item-group naar het volgende:
```html
  <ion-item-group reorder="true" (ionItemReorder)="reorderItems($event)">
```
12. Je moet dus nu een reorderItems methode gaan kennen.  
    In deze methode moet je je lijst aanpassen.  
    Ionic kent gelukkig hier een methode voor.
13. Open _infinite-scroll.ts_ en voeg de import toe:
```typescript
import { reorderArray } from 'ionic-angular';
```
14. Nu kan je een methode toevoegen en je reorder zal al werken:
```typescript
reorderItems(indexes) {
  this.shows = reorderArray(this.shows, indexes);
}
```

# Meer weten?
Kijk op https://ionicframework.com/docs/components/ voor de UI-componenten.  
Kijk op https://ionicframework.com/docs/api/ voor de programmeerbare componenten.
