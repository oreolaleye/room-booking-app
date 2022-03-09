import React from "react";
import Close from "../../resources/close_white.svg";

function LargeNotification(props) {
  return (
    <div className="modal">
      <div className="modal_inner_scroll">
        <div className="large_notify_inner">
          <div
            className={
              props.message.status === "Success"
                ? "notification success"
                : "notification error"
            }
          >
            {props.message.status === "Success" ? (
              <img
                src="https://img.icons8.com/emoji/48/000000/check-mark-emoji.png"
                alt=""
              />
            ) : (
              <img
                src="https://img.icons8.com/ios/48/ffffff/error--v1.png"
                alt=""
              />
            )}
            <img src={Close} alt="" onClick={props.close} />
          </div>
          <div className="notify_text_div">
            <h2 className="boldText">{props.message.message}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LargeNotification;
