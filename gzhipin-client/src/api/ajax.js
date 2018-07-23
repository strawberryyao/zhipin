import axios from 'axios'
window.axios=axios;
axios.withCredentials=true;
export default function ajax(url,data={},type = "GET") {
  if(type === "GET"){
    //register?username=tom&password=123
    let queryStr = '' ;
    Object.keys(data).forEach(key => {
      let value = data[key];
      queryStr  += key + '=' + value + '&';
      if(queryStr){
        queryStr.substring(0,queryStr.length - 1);
        queryStr = '?' + queryStr
      }
    });
   return axios.get(url + queryStr)
  }else{
    return axios.post(url,data);
  }
}
