import { Question, recommendList } from "../App"
import axios from 'axios'

const apiURL = 'https://us-central1-fir-test-acd78.cloudfunctions.net/api/process'
const devApiURL = 'http://127.0.0.1:5001/fir-test-acd78/us-central1/api/process'

const getRecommendList = async(chatHistory:Question[]): Promise<recommendList> => {
  let query:string = "?"
  chatHistory.forEach((item,index)=>{
    if (index === 0){
      query = query +`${item.key}=${item.answer}`
    }else{
      query = query +`&${item.key}=${item.answer}`
    }     
  })
  try {
    const response = await axios.get(`${apiURL}${query}`);
    const content = response.data.result;
    console.log(content)
    return {
      drink: {
        name: content.split('\n')[0].split('お酒：')[1],
        reason: content.split('\n')[1].split('理由：')[1],
      },
      food:{
        name: content.split('\n')[2].split('おつまみ：')[1],
        reason: content.split('\n')[3].split('理由：')[1],
      }
    }
  } catch (error) {
    console.error(error);
    return {
      drink:{
        name:'',
        reason:''
      },
      food:{
        name:'',
        reason:''
      }
    }
  }

    // return {
    //     drink: {
    //       name: "酒",
    //       url: "https://hachinohe-syurui.com/u/sake/joku",
    //       image: "https://www.nihonshu.wiki/html/upload/save_image/1016212027_5bc5d78bd1037.png",
    //     }, 
    //     food: {
    //       name: "食べ物",
    //       url: "https://www.kurashiru.com/recipes/03c299c5-bc7c-4709-a868-0c17a9d9fe04",
    //       image: "https://video.kurashiru.com/production/videos/03c299c5-bc7c-4709-a868-0c17a9d9fe04/compressed_thumbnail_square_normal.jpg?1639367889",
    //   },
    //     reason: "こちらを選んだ理由としては、・・・"
    // }
}

export default getRecommendList