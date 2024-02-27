import { useEffect, useState ,useCallback} from "react";

async function sendHttpRequest(url , config){
    const response = await fetch(url , config);

    const resData = await response.json();

    if(!response.ok) {
        throw new Error('Something went wrong, failed to send request !')
    }

    return resData;
}




export default function useHttp(url , config  , initialData) {
    const [data , setData]=useState(initialData);
    const [isLoading , setIsloading] = useState(false);
    const [error , setError]=useState();

    function clearData(){
        setData(initialData);
    }
    const sendRequest=useCallback(async function sendRequest(data) {
        setIsloading(true);
      try{

        const restData =await  sendHttpRequest(url , {...config, boady:data});
        setData(restData);
      }
      catch(error){
        setError(error.message || 'something went wrong!');
      } 
      
      setIsloading(false);
    },[url , config])

    useEffect(()=>{
        if(config && (config.method=== 'GET' || !config.method) || !config){
            sendRequest();
        }
        
    },[sendRequest , config])

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    }

}