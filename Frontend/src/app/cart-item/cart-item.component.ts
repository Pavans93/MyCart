//inject service
import { DataService } from "./../data.service";
import { Item } from "./../item"; //imports item.ts
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-cart-item",
  templateUrl: "./cart-item.component.html",
  styleUrls: ["./cart-item.component.css"],
  providers: [DataService] //need to add this otherwise nullinjectionerror - no provider for dataservice class error will come
})
export class CartItemComponent implements OnInit {
  cartItemList: Item[] = [];
  selectedItem: Item; //for editing purpose - to keep track of item which one is selected
  toggleForm: boolean = false;

  //for dependency injection create instance of dataservice class to access all the methods in dataservice
  constructor(private dataService: DataService) {}

  //calls method in data service class
  getItems() {
    //observable is a container where data is resided.
    //to get the data from observable ,be an observer , needs to subscribe that particular observable
    this.dataService.getCartItems().subscribe(items => {
      this.cartItemList = items;
      console.log("Data from dataservice:" + this.cartItemList[0].itemName);
    });
  }

  //to add the items into db from form
  addItem(form) {
    let newItem: Item = {
      itemName: form.value.itemName,
      itemQuantity: form.value.itemQuantity,
      itemBought: false
    };
    this.dataService.addCartItem(newItem).subscribe(item => {
      console.log(item);
      this.getItems();
    });
    //console.log(form.value);
  }

  //to delete item  : n:1 & ok:1 will make use of 'n' below
  deleteItem(id) {
    this.dataService.deleteCartItem(id).subscribe(data => {
      console.log(data);
      if (data.n == 1) {
        for (var i = 0; i < this.cartItemList.length; i++) {
          if (id == this.cartItemList[i]._id) {
            this.cartItemList.splice(i, 1); //splice is used to delete elements from an array
          }
        }
      }
    });
  }

  //to edit
  showEditForm(item) {
    this.selectedItem = item;
    this.toggleForm = !this.toggleForm;
  }

  //to update
  editItem(form) {
    let newItem: Item = {
      _id: this.selectedItem._id,
      itemName: form.value.itemName,
      itemQuantity: form.value.itemQuantity,
      itemBought: this.selectedItem.itemBought
    };

    this.dataService.updateCartItem(newItem).subscribe(result => {
      console.log("Original item to be updated with old values" + result);
      this.getItems();
    });
    this.toggleForm = !this.toggleForm; //once the items are updated with new one to display additem form instead of editform need to reverse
  }

  updateItemCheckbox(item) {
    item.itemBought = !item.itemBought;
    this.dataService.updateCartItem(item).subscribe(result => {
      console.log("Original checkbox values" + result.itemBought);
      this.getItems();
    });
  }

  ngOnInit() {
    //method will be executed once the component is loaded into the dom
    this.getItems();
  }
}
