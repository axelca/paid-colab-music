import React, { useState, useEffect, useCallback } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import openSocket from "socket.io-client";

import { getHashParams } from "./helpers/auth";
import { getMin, getMax, inRange } from "./helpers/functions";

import ActionBar from "./components/ActionBar";
import Filter from "./components/Filter";
import LogIn from "./components/LogIn";
import Main from "./components/Main";
import Playlist from "./components/Playlist";
import Sidebar from "./components/Sidebar";
import Track from "./components/Track";

import "./App.css";

// "global" variables
const spotifyApi = new SpotifyWebApi();
const socket = openSocket("http://localhost:8000");
const params = getHashParams();
const token = params.access_token;

const App = () => {
  const [activePlaylist, setActivePlaylist] = useState([]);
  const [activePlaylistData, setActivePlaylistData] = useState({
    low: 0,
    high: 1,
    range: 1
  });
  const [activePlaylistFiltered, setActivePlaylistFiltered] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [nowPlaying, setNowPlaying] = useState({});
  const [peopleValue, setPeopleValue] = useState(0);
  const [playedSongs, setPlayedSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [sortBy, setSortBy] = useState({ order: true, value: "energy" });

  // init
  if (token) {
    spotifyApi.setAccessToken(token);
    if (!loggedIn) {
      setLoggedIn(true);
    }
  }

  // useeffect its?
  useEffect(() => {
    socket.on("new value", data => {
      console.log(data);
      setPeopleValue(data);
    });
    socket.once("next", peopleValue => {
      console.log("user wants to play new track!");
    });
    return () => {
      socket.off("new value");
    };
  });

  // API-actions
  const actions = useCallback(
    (id, action) => {
      switch (action) {
        case "GET_CURRENT_TRACK":
          spotifyApi.getMyCurrentPlayingTrack().then(
            data => {
              if (data && data.item) {
                setNowPlaying(data.item);
                if (!playedSongs.includes(data.item.uri))
                  setPlayedSongs([...playedSongs, data.item.uri]);
              }
            },
            err => {
              console.error(err);
            }
          );
          break;

        case "PLAY":
          console.log("spelade låtar: ", playedSongs);
          const uris = activePlaylistFiltered
            .filter(track => !playedSongs.includes(track.uri))
            .map(track => track.uri);
          console.log("kommande låtar: ", uris);

          spotifyApi
            .play({
              device_id: "a0f1362e5563d599e363de20c77ffc28e481c568",
              uris
            })
            .then(
              data => {
                console.log(data);
              },
              err => {
                console.error(err);
              }
            );
          break;

        case "SET_PLAYLISTS":
          spotifyApi.getUserPlaylists({ limit: 1 }).then(
            data => {
              setPlaylists(data.items);
            },
            err => {
              console.error(err);
            }
          );
          break;

        case "SET_ACTIVE_PLAYLIST":
          spotifyApi.getPlaylistTracks(id).then(
            data => {
              let newData = [];
              const ids = data.items.map(({ track }) => track.id);

              spotifyApi.getAudioFeaturesForTracks(ids).then(
                metaData => {
                  data.items.map(({ track }, i) => {
                    return (newData = [
                      ...newData,
                      {
                        ...track,
                        ...metaData.audio_features[i]
                      }
                    ]);
                  });
                  setActivePlaylist(newData);
                },
                err => {
                  console.log(err);
                }
              );
            },
            err => {
              console.error(err);
            }
          );
          break;

        case "FILTER_PLAYLIST":
          setActivePlaylistFiltered(
            activePlaylist
              .filter(track =>
                inRange(track.energy, peopleValue, activePlaylistData)
              )
              .filter(track => !playedSongs.includes(track.uri))
          );
          break;

        default:
          return;
      }
    },
    [
      activePlaylist,
      activePlaylistData,
      activePlaylistFiltered,
      peopleValue,
      playedSongs
    ]
  );

  // Lifecycle events
  useEffect(() => {
    console.log(playedSongs);
  }, [playedSongs]);

  // Things that happen when loggedIn or playlists update
  useEffect(() => {
    if (loggedIn && playlists.length < 1) {
      actions(null, "SET_PLAYLISTS");
    }
  }, [loggedIn, playlists, actions]);

  // Set data for playlist
  useEffect(() => {
    if (activePlaylist.length > 0) {
      setActivePlaylistData({
        low: getMin(activePlaylist, "energy"),
        high: getMax(activePlaylist, "energy"),
        range:
          getMax(activePlaylist, "energy") - getMin(activePlaylist, "energy")
      });
    }
  }, [activePlaylist]);

  // If people vote or user change sortBy
  useEffect(() => {
    actions(null, "GET_CURRENT_TRACK");
    actions(null, "FILTER_PLAYLIST");
    //eslint-disable-next-line
  }, [peopleValue, sortBy]);

  // If nowPlaying changes, send updates to server
  /*
  useEffect(() => {
    socket.emit("nowPlaying", nowPlaying);
  }, [socket, nowPlaying]);
  */

  return (
    <div className="app">
      {loggedIn ? (
        <>
          <Sidebar>
            <h2>Playlists</h2>
            {playlists.length > 0 &&
              playlists.map(playlist => (
                <Playlist key={playlist.id} actions={actions} data={playlist} />
              ))}
            <h2>Current energy</h2>
            {activePlaylistData.range * peopleValue + activePlaylistData.low}
            <h2>Actions</h2>
            <ActionBar actions={actions} />
          </Sidebar>
          <Main>
            {activePlaylist.length > 0 && (
              <>
                <h2>Current playlist</h2>
                <Filter setSortBy={setSortBy} sortBy={sortBy} />
                {activePlaylist
                  .sort((a, b) =>
                    sortBy.order
                      ? a[sortBy.value] > b[sortBy.value]
                        ? 1
                        : -1
                      : a[sortBy.value] < b[sortBy.value]
                      ? 1
                      : -1
                  )
                  .map(track => (
                    <Track
                      key={track.id}
                      data={track}
                      available={inRange(
                        track.energy,
                        peopleValue,
                        activePlaylistData
                      )}
                    />
                  ))}
              </>
            )}
          </Main>
        </>
      ) : (
        <LogIn />
      )}
    </div>
  );
};

export default App;
