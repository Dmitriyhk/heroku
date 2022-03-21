import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newMessage } from "../redux/actions";
import socket from "../socket";

const SendingMessage = () => {
  const [messageValue, setMessageValue] = useState("");
  const [imageInput, setImageInput] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [disabldedButton, setDisabledButton] = useState(true);
  const userName = useSelector((state) => state.userReducer.name);
  const userPhoto = useSelector((state) => state.userReducer.photo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (imageInput || messageValue) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [imageInput, messageValue]);

  const handleImageChange = (e) => {
    setImageInput(e.target.value);
    let reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageBase64(reader.result);
      };
    }
  };

  const handleDeleteImage = () => {
    setImageInput("");
    setImageBase64("");
  };

  const onSendMessage = async () => {
    socket.emit("ROOM:NEW_MESSAGE", {
      userName,
      userPhoto,
      text: messageValue,
      img: imageBase64,
    });
    dispatch(newMessage(userName, userPhoto, messageValue, imageBase64));
    setMessageValue("");
    setImageInput("");
    setImageBase64("");
  };
  return (
    <div className="chat-sendingMessage">
      <form className="sendingMessage-form">
        <textarea
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
          className="sendingMessage-form__input"
        />
        <div className="sendingMessage-form__control">
          <label className="sendingMessage-form__fileUpload">
            <img className="fileUpload-img" src="send_photo.png" />
            <input
              className="fileUpload-input"
              value={imageInput}
              onChange={handleImageChange}
              type="file"
              accept="image/jpeg,image/png,image/gif"
            />
          </label>
          <label className="sendingMessage-form__fileUpload">
            <img className="fileUpload-img" src="send_message.png" />
            <button
              disabled={disabldedButton}
              onClick={onSendMessage}
              className="sendingMessage-form__btn"
              type="button"
            ></button>
          </label>
        </div>
        {imageBase64 && (
          <div className="fileUpload">
            <img className="fileUpload-img" src={imageBase64} />
            <div onClick={handleDeleteImage} className="fileUpload-img__delete">
              &times;
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SendingMessage;
