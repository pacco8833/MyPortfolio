import React from "react";

export default function Actions() {
    return (
    <div className="info-btns">
        <button onClick={openPage}>My Socials</button>
        <button onClick={openPage}>E-mail Me</button>
    </div>
    )

    function openPage() {
        document.getElementsByClassName("social-icons")[0].scrollIntoView();
    }
}