//创建一个服务 ng g service 名称 --flag module==app
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LoadingController,ToastController} from 'ionic-angular';

@Injectable()

export class MyHttpService {

    constructor(private myHttp: HttpClient,private loadingCtrl:LoadingController,private ToastCtrl:ToastController) {

    }
    //显示一个toast
    showToast(msg){
        var myToast = this.ToastCtrl.create({
            message:msg,
            duration:2000
        });
        myToast.present();
    }
   //用来处理网络请求
    sendRequest(url,handle){
     var myloading = this.loadingCtrl.create({
         content:'正在加载中....'
     });
     myloading.present();
     this.myHttp.get(url,{ withCredentials: true }).subscribe((result)=>{
         //关闭Loading
         myloading.dismiss();
         //拿到服务器的结果后，根据特定的api来做处理
         handle(result);
     });
    }
}