import React from "react";
import "../style/components/NoContent.scss";
function NoContent({title, info, toggle}) {
  return (
    <div className="add-folder">
      <h3>You dont have any {info}.</h3>
      <button className="new-folder" onClick={toggle}>
        <img src="/assets/images/create_new.png" alt="" />
        <h2>Create New {title}</h2>
      </button>
    </div>
  );
}

export default NoContent;
