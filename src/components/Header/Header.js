import "./Header.scss";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <setcion className="header">
      <div className="header__content">
        <div>
          <Link className="header-logo-container">
            <h2 className="header-logo-container__logo">
              Job Application Tracker
            </h2>
          </Link>
        </div>
        <div className="header-button-container">
          <button className="header-button-container__button">
            Add Application
          </button>
        </div>
      </div>
    </setcion>
  );
};
export default Header;
