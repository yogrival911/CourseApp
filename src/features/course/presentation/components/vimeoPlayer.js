import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'vimeoPlaybackPositions';
const VimeoPlayer = ({ videoId, thumbnailImage }) => {
  const [isVideoPlaying, setVideoPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const webViewRef = useRef(null);

  const videoKey = `${videoId}`;

  useEffect(() => {
    const loadPlaybackTime = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        const data = json ? JSON.parse(json) : {};
        setPlaybackTime(data[videoKey] || 0);
        console.log(`playback>>>> : ${data[videoKey] || 0}`);
      } catch (e) {
        console.error('Failed to load playback position', e);
      }
    };
    loadPlaybackTime();
  }, [videoId]);

  const savePlaybackTime = async seconds => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      const data = json ? JSON.parse(json) : {};
      data[videoKey] = seconds;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save playback position', e);
    }
  };

  const injectedJavaScript = `
      const player = new Vimeo.Player(document.querySelector('iframe'));
      player.on('timeupdate', function(data) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'timeupdate', seconds: data.seconds }));
      });
      player.on('loaded', function() {
        player.setCurrentTime(${playbackTime});
      });
      true;
    `;

  const onMessage = event => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      if (message.type === 'timeupdate') {
        savePlaybackTime(message.seconds);
      }
    } catch (err) {
      console.error('Error parsing message', err);
    }
  };


  const handleThumbnailClick = () => {
    setVideoPlaying(!isVideoPlaying);
  };
  
  const thumnail = thumbnailImage?.replace(/^http:\/\//i, 'https://');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
        <head>
        <script src="https://player.vimeo.com/api/player.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
            iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        </style>
        </head>
        <body>
        <iframe
            src="https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&title=0&byline=0&portrait=0"
            frameborder="0"
            allow="autoplay; fullscreen"
            allowfullscreen
        ></iframe>
        </body>
    </html>
    `;

  return (
    <View style={{ flex: 1, aspectRatio: 16 / 9 }}>
      {isVideoPlaying || playbackTime != 0 ? (
        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{ html: htmlContent }}
          javaScriptEnabled={true}
          injectedJavaScript={injectedJavaScript}
          onMessage={onMessage}
          allowsFullscreenVideo
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
        />
      ) : (
        <View style={styles.thumnailContainer}>
          <Image source={{ uri: thumnail }} style={styles.thumbnail} />
          <TouchableOpacity
            style={styles.playButton}
            onPress={handleThumbnailClick}
          >
            <Text style={styles.playIcon}>▶️</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 16 / 9,
    width: '100%',
    overflow: 'hidden',
    borderRadius: 10,
  },
  thumbnailImage: {
    aspectRatio: 16 / 9,
    width: '100%',
    resizeMode: 'cover',
  },
  thumnailContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 16 / 9, // adjust as needed
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  playButton: {
    position: 'absolute',
    top: '38%',
    left: '42%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 48,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default VimeoPlayer;
