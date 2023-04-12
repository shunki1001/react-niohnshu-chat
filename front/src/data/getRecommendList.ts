import { useContext } from "react"
import { recommendList } from "../App"
import { DataContext } from "./DataContext"

const getRecommendList = (): recommendList => {
    return {
        drink: {
          name: "酒",
          url: "https://hachinohe-syurui.com/u/sake/joku",
          image: "https://www.nihonshu.wiki/html/upload/save_image/1016212027_5bc5d78bd1037.png",
        }, 
        food: {
          name: "食べ物",
          url: "https://www.kurashiru.com/recipes/03c299c5-bc7c-4709-a868-0c17a9d9fe04",
          image: "https://video.kurashiru.com/production/videos/03c299c5-bc7c-4709-a868-0c17a9d9fe04/compressed_thumbnail_square_normal.jpg?1639367889",
      },
        reason: "こちらを選んだ理由としては、・・・"
    }
}

export default getRecommendList