import "./Header.css";
import { FiHelpCircle } from "react-icons/fi";
import { APP } from "../../utils/constants";



export default function Header({ user }) {
  return (
    <header className="header">
      <div className="header__brand">
        <div className="header__avatar">
          <img
            src={user?.profileImage}
            alt={`${user?.firstName}'s profile`}
          />
        </div>

        <h1 className="header__title">
          {APP.NAME}
        </h1>
      </div>

      <button
        className="header__help"
        aria-label="Help"
      >
        <FiHelpCircle size={24} />
      </button>
    </header>
  );
}