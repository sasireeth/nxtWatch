import React, { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import ReactPlayer from 'react-player';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { MdPlaylistAdd } from 'react-icons/md';
import { useParams } from 'react-router-dom';

import {
  VideoFrameContainer,
  VideoContainer,
  ParaEl,
  AttributesContainer,
  ChannelContainer,
  ImageEl,
  ContentContainer,
  IconParas,
} from './styledComponents';

import AppTheme from '../../context/Theme';
import './index.css';

const VideoCard = () => {
  const [videoDetails, setVideoDetails] = useState({});
  const [channelDataObj, setChannelDataObj] = useState({});
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [saved, setSaved] = useState(false);

  const { id } = useParams();
  const jwtToken = Cookies.get('jwt_token');

  const { addSavedVideos } = useContext(AppTheme);

  useEffect(() => {
    const getData = async () => {
      const url = `https://apis.ccbp.in/videos/${id}`;
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      };

      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const responseData = await response.json();
          const data = responseData.video_details;
          const convertedData = {
            channel: data.channel,
            description: data.description,
            id: data.id,
            publishedAt: data.published_at,
            thumbnailUrl: data.thumbnail_url,
            title: data.title,
            videoUrl: data.video_url,
            viewCount: data.view_count,
          };
          const channelData = {
            name: data.channel.name,
            profileImageUrl: data.channel.profile_image_url,
            subscriberCount: data.channel.subscriber_count,
          };
          setVideoDetails(convertedData);
          setChannelDataObj(channelData);
        } else {
          console.error('Failed to fetch video details');
        }
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    getData();

    return () => {
      // Cleanup function if needed
    };
  }, [id, jwtToken]);

  const isDisliked = () => {
    if (liked) {
      setLiked(false);
    }
    setDisliked(!disliked);
  };

  const isLiked = () => {
    if (disliked) {
      setDisliked(false);
    }
    setLiked(!liked);
  };

  const onSave = () => {
    setSaved(!saved);
    addSavedVideos(videoDetails); // Save videoDetails to context
  };

  const { videoUrl, title, viewCount, publishedAt, description } = videoDetails;

  return (
    <AppTheme.Consumer>
      {(values) => {
        const { activeTheme } = values;
        const bgColor = activeTheme === 'light' ? '#ffffff' : '#000000';
        const color = activeTheme === 'light' ? '#000000' : '#ffffff';

        return (
          <VideoContainer $bgColor={bgColor} $color={`${color}`}>
            <VideoFrameContainer>
              <ReactPlayer height={1000} url={videoUrl} controls className="react-player" />
              <ParaEl>
                <b>{title}</b>
              </ParaEl>
            </VideoFrameContainer>
            <AttributesContainer>
              <ParaEl>
                {viewCount} views . {publishedAt}
              </ParaEl>
              <ChannelContainer $color={`${color}`}>
                <IconParas onClick={isLiked} $iconColor={liked ? '#3b82f6' : color}>
                  <AiOutlineLike size={20} /> Like
                </IconParas>
                <IconParas onClick={isDisliked} $iconColor={disliked ? '#3b82f6' : color}>
                  <AiOutlineDislike size={20} /> Dislike
                </IconParas>
                <IconParas onClick={onSave} $iconColor={saved ? '#3b82f6' : color}>
                  <MdPlaylistAdd size={20} /> {saved ? 'Saved' : 'Save'}
                </IconParas>
              </ChannelContainer>
            </AttributesContainer>
            <ChannelContainer>
              <ImageEl src={channelDataObj.profileImageUrl} />
              <ContentContainer>
                <ParaEl>
                  <b>{channelDataObj.name}</b>
                </ParaEl>
                <ParaEl>{channelDataObj.subscriberCount}</ParaEl>
              </ContentContainer>
            </ChannelContainer>
            <ParaEl $padding="30px">{description}</ParaEl>
          </VideoContainer>
        );
      }}
    </AppTheme.Consumer>
  );
};

export default VideoCard;
