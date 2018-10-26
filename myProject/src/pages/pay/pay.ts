import { Component } from '@angular/core';
import { LoadingController,IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';


/**
 * Generated class for the PayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController,private LoadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayPage');
  }
  
  //关闭模态窗：ViewController
  closeModal(){
    this.viewCtrl.dismiss(false);
  }
  
  //显示一个loading，3s之后，关闭模态窗
  pay(){
    var myLoading = this.LoadingCtrl.create({
      content:"支付中........"
    });
    myLoading.present();
    setTimeout(()=>{
      myLoading.dismiss();
      //如果支付成功，给模态窗传递一个true，否则传一个false
      this.viewCtrl.dismiss(true);
    },3000);
  }
}
