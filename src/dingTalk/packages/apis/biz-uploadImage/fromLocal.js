import ddTalk from 'dingtalk-javascript-sdk' ;
import ddInit from '../../init/index';


export default {
  name:'biz-uploadImage',
  appList:['biz.util.uploadImage'],
    /*
    * 从本地上传图片
    * authUrl:后台鉴权服务地址
    * paramJson:参数信息组Json格式
    *{
    * compression:true,//(是否压缩，默认为true)
    * multiple: false, //是否多选，默认false
    *  max: 3, //最多可选个数
    * quality: 50, // 图片压缩质量,
    * resize: 50, // 图片缩放率
    * stickers: {   // 水印信息
    *  time: "08:35",
    *  dateWeather: "2016.05.06 周六·晴转多云 16℃",
    *   username: "王晓",
    *   address: "西湖·杭州"
    *  }
    * callBack:成功回调函数
    * errBack:失败回调函数
    * by kong-ly
    * 2017年12月21日
    * */
  getLocation: function (authUrl,paramJson,callBack,errBack){

      ddInit.method.authInfo(authUrl,(data)=>{

        ddInit.method.getConfig(data,this.appList,(h)=>{

          ddTalk.ready(function(){
            const dd = ddTalk.apis;
            // 设置导航
            dd.device.geolocation.get({
              compression:paramJson.compression,//(是否压缩，默认为true)
              multiple: paramJson.multiple, //是否多选，默认false
              max: paramJson.max, //最多可选个数
              quality: paramJson.quality, // 图片压缩质量,
              resize: paramJson.quality, // 图片缩放率
              stickers: {   // 水印信息
                time: "08:35",
                dateWeather: "2016.05.06 周六·晴转多云 16℃",
                username: "王晓",
                address: "西湖·杭州"
              },
              onSuccess : function(result) {
                if (typeof callBack === 'function') {
                  callBack(result);
                }
              },
              onFail : function(err) {
                console.log(JSON.stringify(err));
                if (typeof errBack === 'function') {
                  errBack(err);
                }
              }
            });
          });

        })
      })


  }


}
