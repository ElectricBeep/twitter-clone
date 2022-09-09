import { MdOutlineAddAPhoto } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

const ListFeedAddList = ({ setOpenNewList }) => {
  return (
    <div className="listFeedOpenNewListContainer">
      <div className="listFeedOpenNewListWrapper">
        <div className="listFeedOpenNewListNavbar">
          <div className="listFeedOpenNewListNavbarLeft">
            <AiOutlineClose
              className="listFeedOpenNewListNavbarCloseIcon"
              onClick={() => setOpenNewList(false)}
            />
            <h3>Create a new List</h3>
          </div>
          <div>
            <button className="listFeedNewListNextButton">
              Next
            </button>
          </div>
        </div>
        <div className="listFeedOpenNewListImgContainer">
          <img
            src="https://www.solidbackgrounds.com/images/1920x1080/1920x1080-dark-gray-solid-color-background.jpg"
            alt="new_list_cover"
            className="listFeedOpenNewListImg"
          />
          <MdOutlineAddAPhoto className="listFeedOpenNewListAddImgIcon" />
        </div>
        <div className="listFeedOpenNewListInputs">
          <input
            type="text"
            placeholder="Name"
            className="listFeedOpenNewListNameInput"
          />
          <textarea
            cols="6"
            rows="10"
            placeholder="Description"
            className="listFeedOpenNewListTextarea"
          />
          <div className="listFeedOpenNewListInputsCheckbox">
            <div>
              <label>Make Private</label>
              <p className="listFeedOpenNewListCheckboxText">
                When you make a List private, only you can see it.
              </p>
            </div>
            <input
              type="checkbox"
              className="listFeedOpenNewListCheckbox"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListFeedAddList