import React, {useEffect, useState} from "react";
import "./likeComponent.scss"

type Props = {
    isLiked: boolean;
    onLikeMovieClick: (like: boolean) => void;
}

const LikeComponent: React.FC<Props> = (props) => {
    const {isLiked, onLikeMovieClick} = props;

    const [like, setLike] = useState(false);

    useEffect(() => {
        setLike(isLiked);
    }, [isLiked])

    function handleClick() {
        onLikeMovieClick(!like);
        setLike(!like);
    }

    return (
        <div data-bs-toggle="tooltip" title="Click if you LIKE!"
             className={like ? "like-icon like" : "like-icon dislike"} onClick={() => handleClick()}></div>
    )
}

export default LikeComponent;