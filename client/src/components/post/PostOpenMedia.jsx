import { AiOutlineClose } from "react-icons/ai";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";

const PostOpenMedia = ({ openMedia, setOpenMedia, images, slideNumber, setSlideNumber, type }) => {
  const handleMove = (direction) => {
    if (direction === "left") {
      setSlideNumber(slideNumber - 1);
    } else if (direction === "right") {
      setSlideNumber(slideNumber + 1);
    }
  };

  return (
    <div className="postOpenMedia">
      {slideNumber > 0 && (
        <BsArrowLeftShort
          className="postOpenMediaArrowLeft"
          onClick={() => handleMove("left")}
        />
      )}
      <div className="postOpenMediaWrapper">
        {type === "single" ? (
          <img
            src={images}
            alt="post"
            className="postOpenMediaImage"
          />
        ) : (
          <img
            src={images[slideNumber]}
            alt="post"
            className="postOpenMediaImage"
          />
        )}
      </div>
      {slideNumber < images.length - 1 && (
        <BsArrowRightShort
          className="postOpenMediaArrowRight"
          onClick={() => handleMove("right")}
        />
      )}
      <AiOutlineClose
        onClick={() => setOpenMedia(!openMedia)}
        className="postOpenMediaCloseButton"
      />
    </div>
  )
}

export default PostOpenMedia