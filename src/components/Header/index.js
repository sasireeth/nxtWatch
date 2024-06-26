import React, { useState } from 'react';
import { HiHome } from 'react-icons/hi';
import { AiFillFire } from 'react-icons/ai';
import { SiYoutubegaming } from 'react-icons/si';
import { MdPlaylistAdd } from 'react-icons/md';
import { BsMoon, BsBrightnessHigh } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiLogOut } from 'react-icons/fi';
import { ImCross } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';
import AppTheme from '../../context/Theme';

import {
  HeaderContainer,
  HeaderContentsSmallContainer,
  HeaderContentsLargeContainer,
  ImageEl,
  ButtonElSmall,
  ButtonElLarge,
  ListContainer,
  ListItem,
  Para,
  ExtraDiv,
} from './styledComponents';

const Header = () => {
  const [displayHeader, setDisplayHeader] = useState('none');
  const navigate = useNavigate();

  const showHeader = () => {
    setDisplayHeader('block');
  };

  const hideHeader = () => {
    setDisplayHeader('none');
  };

  const logOut = () => {
    Cookies.remove('jwt_token');
    navigate('/login');
  };

  const onClickLogo = () => {
    navigate('/');
  };

  return (
    <AppTheme.Consumer>
      {(value) => {
        const { activeTheme, changeTheme } = value;
        const color = activeTheme === 'light' ? '#000000' : '#ffffff';
        const bgColor = activeTheme === 'light' ? '#ffffff' : '#231f20';
        const navColor = activeTheme === 'light' ? 'blacked' : 'whiter';

        const onChangeTheme = () => {
          const val = activeTheme === 'light' ? 'dark' : 'light';
          changeTheme(val);
        };

        return (
          <HeaderContainer $bgColor={bgColor}>
            <ImageEl
              $height="25px"
              src={
                activeTheme === 'light'
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
              }
              alt="website logo"
              onClick={onClickLogo}
              $cursor="pointer"
            />
            <HeaderContentsSmallContainer>
              <ButtonElSmall onClick={onChangeTheme} $color={`${color}`}>
                {activeTheme === 'light' ? (
                  <BsMoon size={25} />
                ) : (
                  <BsBrightnessHigh size={25} />
                )}
              </ButtonElSmall>
              <ButtonElSmall $color={`${color}`} onClick={showHeader}>
                <GiHamburgerMenu size={25} />
              </ButtonElSmall>
              <ButtonElSmall $color={`${color}`} onClick={logOut}>
                <FiLogOut size={25} />
              </ButtonElSmall>
            </HeaderContentsSmallContainer>
            <ExtraDiv display={displayHeader}>
              <ListContainer
                $bgColor={activeTheme === 'light' ? '#e2e8f0' : '#000000'}
              >
                <Para onClick={hideHeader}>
                  <ImCross
                    color={activeTheme === 'light' ? '#000' : '#d7dfe9'}
                  />
                </Para>
                <Link to="/" className={navColor}>
                  <ListItem $color={`${color}`}>
                    <HiHome className="nav-icons" /> <span>Home</span>
                  </ListItem>
                </Link>
                <Link to="/trending" className={navColor}>
                  <ListItem $color={`${color}`}>
                    <AiFillFire className="nav-icons" />{' '}
                    <span>Trending</span>
                  </ListItem>
                </Link>
                <Link to="/gaming" className={navColor}>
                  <ListItem $color={`${color}`}>
                    <SiYoutubegaming className="nav-icons" />{' '}
                    <span>Gaming</span>
                  </ListItem>
                </Link>
                <Link to="/saved-videos" className={navColor}>
                  <ListItem $color={`${color}`}>
                    <MdPlaylistAdd className="nav-icons" />
                    <span>Saved Videos</span>
                  </ListItem>
                </Link>
              </ListContainer>
            </ExtraDiv>
            <HeaderContentsLargeContainer>
              <ButtonElLarge
                $border="none"
                onClick={onChangeTheme}
                $color={`${color}`}
              >
                {activeTheme === 'light' ? (
                  <BsMoon size={25} />
                ) : (
                  <BsBrightnessHigh size={25} className="animate" />
                )}
              </ButtonElLarge>
              <ImageEl
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                $margin="30px"
              />
              <ButtonElLarge
                $color={activeTheme === 'light' ? '#3b82f6' : '#ffffff'}
                $padding="5px 15px"
                onClick={logOut}
              >
                Logout
              </ButtonElLarge>
            </HeaderContentsLargeContainer>
          </HeaderContainer>
        );
      }}
    </AppTheme.Consumer>
  );
};

export default Header;
