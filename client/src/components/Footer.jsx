import React from "react";

let my_year = new Date().getFullYear();
function Footer() {
  return (
    <div>
      <footer>
        <p>Copyright ⓒ {my_year}</p>
      </footer>
    </div>
  );
}

export default Footer;
