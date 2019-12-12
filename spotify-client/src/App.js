import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import openSocket from "socket.io-client";

import { getHashParams } from "./helpers/auth";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import ActionBar from "./components/ActionBar";
import LogIn from "./components/LogIn";
import Filter from "./components/Filter";
import Playlist from "./components/Playlist";
import Track from "./components/Track";
import NowPlaying from "./components/NowPlaying";

import "./App.css";

const spotifyApi = new SpotifyWebApi();
const socket = openSocket("https://aabae799.ngrok.io");

const App = () => {
  const [sortBy, setSortBy] = useState({ acs: true, value: "energy" });
  const [activePlaylist, setActivePlaylist] = useState([]);
  const [activePlaylistFiltered, setActivePlaylistFiltered] = useState([]);
  const [nowPlaying, setNowPlaying] = useState({});
  const [playedSongs, setPlayedSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [peopleEnergy, setPeopleEnergy] = useState(0);

  const params = getHashParams();
  const token = params.access_token;

  socket.on("values from server", data => {
    setPeopleEnergy(data);
  });

  if (token) {
    spotifyApi.setAccessToken(token);
    if (!loggedIn) {
      setLoggedIn(true);
    }
  }

  const filterChange = value => {
    setSortBy(value);
  };

  const inRange = (songValue, peopleValue, range) => {
    const min = parseFloat(peopleValue) - range;
    const max = parseFloat(peopleValue) + range;

    return songValue >= min && songValue <= max;
  };

  const actions = (id, action) => {
    switch (action) {
      case "GET_CURRENT_TRACK":
        spotifyApi.getMyCurrentPlayingTrack().then(
          data => {
            //console.log(data);

            /*
            if (data.progress_ms >= data.item.duration_ms - 7000) {
              const uris = activePlaylistFiltered.map(track => track.uri);

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
            }
            */
            setNowPlaying(data);
          },
          err => {
            console.error(err);
          }
        );
        break;

      case "PLAY":
        const uris = activePlaylistFiltered.map(track => track.uri);

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
        spotifyApi.getUserPlaylists({ limit: 2 }).then(
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
            .filter(track => inRange(track.energy, peopleEnergy, 0.1))
            .filter(track => !playedSongs.includes(track.uri))
        );
        break;

      default:
        return;
    }
  };

  useEffect(() => {
    if (loggedIn && playlists.length < 1) {
      actions(null, "SET_PLAYLISTS");
    }
  });

  useEffect(() => {
    actions(null, "FILTER_PLAYLIST");
  }, [peopleEnergy, sortBy]);

  useEffect(() => {
    setInterval(() => {
      actions(null, "GET_CURRENT_TRACK");
    }, 1000);
  }, [playedSongs]);

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
            {peopleEnergy}
            <h2>Actions</h2>
            <ActionBar actions={actions} />
          </Sidebar>

          <Main>
            {activePlaylist.length > 0 && (
              <>
                <h2>Current playlist</h2>
                <Filter filterChange={filterChange} sortBy={sortBy} />
                {activePlaylist
                  .sort((a, b) =>
                    sortBy.acs
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
                      available={inRange(track.energy, peopleEnergy, 0.1)}
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
