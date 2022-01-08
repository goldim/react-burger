
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router';

import "./styles.css"
import profileStyles from "./profile.module.css"
import { FC } from 'react';

const NavList = () => {
  return (
    <div style={{marginRight: "30px"}}>
      <ul>
        <li><ProfileLink to="/profile/settings">Профиль</ProfileLink></li>
        <li><ProfileLink to="/profile/orders">История заказов</ProfileLink></li>
        <li><ProfileLink to="/logout">Выйти</ProfileLink></li>
      </ul>
    </div>
  );
}

interface IProfileLinkProps {
  children: string,
  to: string
}

const ProfileLink: FC<IProfileLinkProps> = ({children, to}) => (
  <NavLink to={to} className={({ isActive }) => (isActive ? profileStyles.active : profileStyles.inactive)} style={{ textDecoration: 'none' }}>
    <p className="text text_type_main-default">{children}</p>
  </NavLink>
)

const ProfilePage = () => (
  <div className={profileStyles.twoColumns}>
    <NavList/>
    <Outlet/>
  </div>
)


export default ProfilePage;