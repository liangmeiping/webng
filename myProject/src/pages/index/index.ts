import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DetailPage} from '../detail/detail';
import { MyHttpService } from '../../app/utility/service/myhttp.service';
/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//http://localhost/ajia_code/data/product/
@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
  
  carouselItems = [];
  newArrivalItems =[];
  recommendedItems =[];
  detail = DetailPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,private myService:MyHttpService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
    /* this.myHttp.get('http://localhost/ajia_code/data/product/index.php').subscribe((result:any)=>{ 
      this.carouselItems = result.carouselItems;
      this.newArrivalItems = result.newArrivalItems;
      this.recommendedItems = result.recommendedItems;
     // console.log(this.recommendedItems);
    }) */
    this.myService.sendRequest('http://localhost/ajia_code/data/product/index.php',(result:any)=>{ 
      this.carouselItems = result.carouselItems;
      this.newArrivalItems = result.newArrivalItems;
      this.recommendedItems = result.recommendedItems;
     // console.log(this.recommendedItems);
    });
  }

}
