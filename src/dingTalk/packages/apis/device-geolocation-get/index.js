import ddTalk from 'dingtalk-javascript-sdk' ;
import ddInit from '../../init/index';


export default {
  name:'device-geolocation-get',
  appList:['device.geolocation.get'],
    /*
    * 获取当前地理位置
    * authUrl:后台鉴权服务地址
    * paramJson:参数信息组Json格式
    * {
    * targetAccuracy:Number  精度 单位m
    * coordinate : Number,  1：获取高德坐标， 0：获取标准坐标；推荐使用高德坐标；标准坐标没有address字段
    withReGeocode : Boolean,是否需要带有逆地理编码信息；该功能需要网络请求，请更具自己的业务场景使用
    useCache:true, //默认是true，如果需要频繁获取地理位置，请设置false
    }
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
              targetAccuracy : paramJson.targetAccuracy,
              coordinate : paramJson.coordinate,
              withReGeocode : paramJson.withReGeocode,
              useCache:paramJson.useCache, //默认是true，如果需要频繁获取地理位置，请设置false
              onSuccess : function(result) {
                if (typeof callBack === 'function') {
                  callBack(result);
                }
                /* 高德坐标 result 结构
						{
								longitude : Number, // POI的经度
								latitude : Number,// POI的纬度
								accuracy : Number,
								address : String,
								province : String,
								city : String,
								district : String,
								road : String,
								netType : String,
								operatorType : String,
								errorMessage : String,
								errorCode : Number,
								isWifiEnabled : Boolean,
								isGpsEnabled : Boolean,
								isFromMock : Boolean,
								provider : wifi|lbs|gps,
								accuracy : Number,
								isMobileEnabled : Boolean
						}
						*/

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
