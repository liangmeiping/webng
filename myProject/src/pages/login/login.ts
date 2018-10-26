import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyHttpService } from '../../app/utility/service/myhttp.service';
import {HomePage} from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  uname = "";
  upwd = "";
  Home =HomePage;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private myService: MyHttpService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }

  doLogin() {
    /*//登录 
    this.myHttp.get('http://localhost/ajia_code/data/user/login.php?uname=dingding&upwd=123456').subscribe((result: any) => {
      console.log(result);
      if (result.code == 200) {
        console.log("加入购物车商品的pid=" + this.navParams.data.pid);
      }
    }); */
    this.myService.sendRequest(`http://localhost/ajia_code/data/user/login.php?uname=${this.uname}&upwd=${this.upwd}`, (result: any) => {
      console.log(result);
      var message ="";
      if (result.code == 200) {
        message = "登录成功";
        if (this.navCtrl.canGoBack())
          this.navCtrl.pop();
        else
          this.navCtrl.push(this.Home);
      }else{
         message="登录失败";
      }
      this.myService.showToast(message);
    });
  }
}
