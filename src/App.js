import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import AppTheme from './context/Theme';
import Login from './components/Login';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Trending from './components/Trending';
import Gaming from './components/Gaming';
import SavedVideos from './components/SavedVideos';
import VideoCard from './components/VideoCard';
import NotFound from './components/NotFound';

class App extends Component {
  state = { activeTheme: 'light', savedVideos: [] };

  changeTheme = (activeTheme) => {
    this.setState({ activeTheme });
  };

  addSavedVideos = (data) => {
    this.setState((prevState) => {
      const { savedVideos } = prevState;
      if (!savedVideos.some((item) => item.id === data.id)) {
        return {
          savedVideos: [...savedVideos, data],
        };
      }
      return null;
    });
  };

  render() {
    const { activeTheme, savedVideos } = this.state;
    const bgColor = activeTheme === 'light' ? 'light' : 'dark';

    return (
      <AppTheme.Provider
        value={{
          activeTheme,
          savedVideos,
          addSavedVideos: this.addSavedVideos,
          changeTheme: this.changeTheme,
        }}
      >
        <div className="app-container">
          <Header />
          <div className={`${bgColor} main-frame-container`}>
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="trending" element={<Trending />} />
              <Route path="gaming" element={<Gaming />} />
              <Route path="saved-videos" element={<SavedVideos />} />
              <Route path="videos/:id" element={<VideoCard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </AppTheme.Provider>
    );
  }
}

export default App;
