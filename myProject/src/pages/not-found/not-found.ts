import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the NotFoundPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-not-found',
  templateUrl: 'not-found.html',
})
export class NotFoundPage {

  num = null;
  timer = null;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad NotFoundPage');
    //console.log('1--'+this.num);
    this.num=3;
    //console.log('2--'+this.num);
    this.timer = setInterval(() => { 
     // console.log('3--'+this.num);
      this.num--;
      if (this.num == 0) {
        if (this.navCtrl.canGoBack())
          this.navCtrl.pop();
        else
          clearInterval(this.timer);
      }
      /* if(this.num>0)
        this.num-=1;
      else{
        this.navCtrl.pop();
        clearInterval(timer);
        console.log(1);
      }  */
    }, 1000);
  }

  //声明周期钩子函数
  ionViewWillLeave() {
     /* this.num=3; */
     clearInterval(this.timer);
  }

}
