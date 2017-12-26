import ddTalk from 'dingtalk-javascript-sdk' ;
import axios from 'axios';

export default {
  name:'init',
  method:{
    /*
    *authInfo 钉钉鉴权
    * by kong-ly
    * 2017年12月20日
    * authUrl:String,callback:function
    * 鉴权认证地址      回调函数
    * */
    authInfo(authUrl,callback){
      axios.get(authUrl,{
        params:{
          signedUrl:window.location.href.split('#')[0],   //鉴权时，只对#号之前url进行鉴权，服务端验权时只验证#号之前
        }
      }).then((response) => {
        if (typeof callback === 'function') {
          callback(response)
        }
      }).catch(function(err){
        console.log(err);
        return err;
      });
    },
    /*
    *getConfig 钉钉页面调用jsapi授权
    *_config:{},authInfo返回的鉴权信息
    * apilist，当前调用页面所需要用到的api列表
    * apilist元素形如 dd.biz.map.locate
    * callback,回调函数
    * */
    getConfig(_config,apilist,callback){
      if(apilist.length>0){
          for(let i =0;i<apilist.length;i++){
            apilist[i] = apilist[i].split('dd.')[0];
          }
      }
      ddTalk.config ({
        agentId : _config.agentid,
        corpId : _config.corpId,
        timeStamp : _config.timeStamp,
        nonceStr : _config.nonceStr,
        signature : _config.signature,
        jsApiList : apilist,
      });
      ddTalk.error(function(error){
        console.log('dd error:' + JSON.stringify(error));
      });
      if (typeof callback === 'function') {
        callback(ddTalk)
      }
    },

  }
}
