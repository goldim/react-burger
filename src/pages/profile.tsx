
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router';

import profileStyles from "./profile.module.css"
import { FC } from 'react';

const NavList = () => {
  return (
    <div className={profileStyles.navListContainer}>
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

const ProfileLink: FC<IProfileLinkProps> = ({children, to}) => {
  return (
    <NavLink to={to} className={({ isActive }) => { return `${(isActive ? profileStyles.active : profileStyles.inactive)} ${profileStyles.navLink}` }}>
      <p className="text text_type_main-default">{children}</p>
    </NavLink>
  )
}

const ProfilePage = () => (
  <>
    <div className={profileStyles.profileContainer}>
      <section><NavList/></section>
      <section><Outlet/></section>
    </div>
  </>
)


export default ProfilePage;