import { Injectable } from "@angular/core";
//import http,map
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class DataService {
  //create an instance of http inside constructor
  constructor(private http: Http) {}

  //to fetch data from backend
  //deployment: heroku will run application on the nodejs domain so need to mention localhost:3000 in get,post,put and delete methods
  //http://localhost:3000/api/get_items ----> api/get_items
  getCartItems() {
    return this.http
      .get("http://localhost:3000/api/get_items")
      .map(res => res.json()); //to map the response as json
  }

  //to add the new item
  addCartItem(newItem) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:3000/api/post_item", newItem, {
        headers: headers
      })
      .map(res => res.json());
  }

  //to delete
  deleteCartItem(id) {
    return this.http
      .delete("http://localhost:3000/api/delete_item/" + id)
      .map(res => res.json());
  }

  //to update
  updateCartItem(newItem) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .put("http://localhost:3000/api/put_item/" + newItem._id, newItem, {
        headers: headers
      })
      .map(res => res.json());
  }
}
