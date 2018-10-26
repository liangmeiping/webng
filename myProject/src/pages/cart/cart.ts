import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyHttpService } from '../../app/utility/service/myhttp.service';
import { LoginPage } from '../login/login';
import { OrderConfirmPage } from '../order-confirm/order-confirm';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  list = [];
  isAllSelect = false;//记录是否全选

  constructor(public navCtrl: NavController, public navParams: NavParams, private myService: MyHttpService) {
  }

  ionViewWillEnter() {
    //console.log('ionViewDidLoad CartPage');
    /* this.myService.sendRequest('http://localhost/ajia_code/data/user/session_data.php',(result)=>{
         console.log(result);
    }); */
    this.myService.sendRequest("http://localhost/ajia_code/data/cart/list.php", (result) => {
     // console.log(result);
      if (result.code == 300) {
        this.navCtrl.push(LoginPage);
      } else if (result.code == 200) {
        this.list = result.data;
      //  console.log(this.list);
        this.isSelected(false);
        this.calcAll();
      }
    });
  }
  //遍历list数据
  isSelected(bool) {
    for (var i = 0; i < this.list.length; i++) {
      this.list[i].isSelected = bool;
    }
  }

  //跳转到首页(让ionTabs中第0个tab被选中)
  jumpToIndex() {
    this.navCtrl.parent.select(0);
  }
  //处理全选时的行为
  selectAll() {
    //遍历list中所有的商品，将isSelected跟isAllSelect保持一致
    this.isSelected(this.isAllSelect);
    this.calcAll();
  }
  isSelectedone(index) {
    /* if (this.list[index].isSelected == false)
      this.isAllSelect = false;
    var bool= 0;
    for (var i = 0; i < this.list.length; i++) {
      if(this.list[i].isSelected){
         bool++;
      }
    }
    if(bool==this.list.length){
       this.isAllSelect = true;
    } */
    //逻辑与运算
    var result = true;
    for (var i = 0; i < this.list.length; i++) {
      result = result && this.list[i].isSelected;
    }
    this.isAllSelect = result;
    this.calcAll();
  }
  //计算被选中商品的价格总和
  calcAll() {
    var totalPrice = 0;
    for (var i = 0; i < this.list.length; i++) {
      var p = this.list[i];
      if (p.isSelected) {
        totalPrice += (p.count * p.price);
      }
    }
    return totalPrice;
  }

  //结算
  jumpToOC() {
    this.navCtrl.push(OrderConfirmPage,this.calcAll());
  }

  /* //数量加按钮
  add(index){
   if(this.list[index].count>0) 
   this.list[index].count++;
  }
  //数量减按钮
  red(index){
    if(this.list[index].count>1)
      this.list[index].count--;
  } */
  //修改商品的数量
  modifyCount(isAdd, Index) {
    if (isAdd) {
      this.list[Index].count++;
    } else {
      if (this.list[Index].count == 1){
        return;
      }
        this.list[Index].count--;
    }
  }
  
  //删除
  delete(index){
    this.list.splice(index,1);
  }
}
