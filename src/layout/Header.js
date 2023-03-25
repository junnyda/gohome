import MainLogo from "../assets/images/gobook_logo3.png";
import "assets/css/layout/Layout.css";
import { Link } from "react-router-dom";

function Header() {

  return (
    <div className="Header">
      <div>
        
        <Link to={"/"}>
          <img src={MainLogo} className="Header-logo" alt="logo" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
