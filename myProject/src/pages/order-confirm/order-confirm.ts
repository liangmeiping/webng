import { Component } from '@angular/core';
import {ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyHttpService } from '../../app/utility/service/myhttp.service';
import { PayPage } from '../pay/pay';

/**
 * Generated class for the OrderConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-confirm',
  templateUrl: 'order-confirm.html',
})
export class OrderConfirmPage {
  list = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private myService:MyHttpService,private modalCtrl:ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderConfirmPage');
    console.log(this.navParams.data);
    console.log(this.myService);
    var url = "http://localhost/ajia_code/data/cart/list.php";
    this.myService.sendRequest(url,(result)=>{
      if(result.code==200){
        this.list = result.data;
        console.log(this.list);
      }
    });
  }

  showModal(){
    var myModal = this.modalCtrl.create(PayPage);
    myModal.present();
    myModal.onDidDismiss((result)=>{
      console.log(result);
      if(result){
        //支付成功，跳转到首页（第0个tab）
        this.navCtrl.parent.select(0);
      }
    });
  }

}
