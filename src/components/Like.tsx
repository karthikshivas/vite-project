import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { useState } from "react";

interface LikeProps {
    onClick: () => void;
}


const Like = ({onClick}: LikeProps) => {
  const [fullHeart, setFullHeart] = useState(false);
  const toggleHeart = () => {
    setFullHeart(!fullHeart);
    onClick();
  }
  
  if(fullHeart) return <IoIosHeart size ={40} color="#ff6b81" onClick={toggleHeart} />
  return <IoIosHeartEmpty onClick={toggleHeart} size={40} />
}

export default Like