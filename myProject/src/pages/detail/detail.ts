import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotFoundPage } from '../not-found/not-found';
import { CartPage } from '../cart/cart';
import { MyHttpService } from '../../app/utility/service/myhttp.service';
import {LoginPage} from '../login/login';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  list = [];
  picList = [];
  NoFound = NotFoundPage;
  Cart = CartPage;
  Login = LoginPage;


  constructor(public navCtrl: NavController, public navParams: NavParams, private myService: MyHttpService) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad DetailPage');
    // console.log(this.navParams.data);
    /* this.myHttp.get("http://localhost/ajia_code/data/product/details.php?lid=" + this.navParams.data.pid).subscribe((result: any) => {
      // console.log(result.details);
      this.list = result.details;
      this.picList = this.list["picList"];
      // console.log(this.list);
    }); */
    this.myService.sendRequest("http://localhost/ajia_code/data/product/details.php?lid=" + this.navParams.data.pid,(result: any) => {
      // console.log(result.details);
      this.list = result.details;
      this.picList = this.list["picList"];
      // console.log(this.list);
    });
  }

  AddCart() {
    /*//登录 
    this.myHttp.get('http://localhost/ajia_code/data/user/login.php?uname=dingding&upwd=123456').subscribe((result: any) => {
      console.log(result);
      if (result.code == 200) {
        console.log("加入购物车商品的pid=" + this.navParams.data.pid);
      }
    }); */
    var url = `http://localhost/ajia_code/data/cart/add.php?lid=${this.navParams.data.pid}&buyCount=1`;
    //用升级后的网络服务
    this.myService.sendRequest(url, (result: any) => {
      console.log(result);
      var message = "";
      if (result.code == 200) {
        message = "加入购物车成功";
      } else {
        message = "加入购物车失败";
        if(result.code==300){
          this.navCtrl.push(this.Login);
        }
      }
      this.myService.showToast(message);
    });

    /*  this.myHttp.get(url, { withCredentials: true }).subscribe((result: any) => {
       +console.log(result);
       var message = "";
       if (result.code == 200) {
         message = "加入购物车成功";
       } else{
         message = "加入购物车失败";
       } 
       var myToast = this.ToastCtrl.create({
         message: message,
         duration: 2000
       });
       myToast.present();
     }); */
  }
}
