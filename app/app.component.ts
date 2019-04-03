import { Component, ViewEncapsulation } from '@angular/core';
import { observable, action, computed, autorun } from 'mobx';

// const box = {
//    items: [1, 2, 3],
//    get allItems() {
//        return this.items;
//    },
//    get mappedItems() {
//        return this.items.map((e) => e);
//    }
// };

class Box {
   items = [1, 2, 3];

   get allItems() {
       return this.items;
   }

   @computed get mappedItems() {
       return this.items.map((e) => e);
   }
}

const b = new Box();

console.log('answ', b.mappedItems === b.mappedItems);

class Item {
  id: string;
  name: string;
  value: number;
  constructor(options) {
    this.id = options.id;
    this.name = options.name;
    this.value = options.value;
  }
}

class State {
  @observable items: Item[] = [];
  message: string;

  @action addItem(item: Item) {
    this.items.push(item);
  }

  @computed get total() {
    return this.items.reduce((c, n) => c + n.value, 0);
  }

  constructor() {
    autorun(() => {
      console.log(this.message);
    })
  }

}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent  {
  name = 'Angular 4';
  value = null;
  lastId = 0;

  state = new State();

  constructor() {
    const item = new Item({
      id: -1, 
      name: new Date().getTime().toString(),
      value: 5
    })
    this.state.addItem(item);
  }

  getTotal() {
    alert(this.state.total);
  }

  addItem() {
    const item = new Item({
      id: this.lastId, 
      name: new Date().getTime().toString(),
      value: parseInt(this.value)
    })
    this.state.addItem(item);
    this.value = null;
    this.lastId++;
  }
}
