import React, { Component, useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import openSocket from "socket.io-client";

import "./App.css";

const spotifyApi = new SpotifyWebApi();
const socket = openSocket("https://e6e4d7de.ngrok.io");

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;

    if (token) {
      spotifyApi.setAccessToken(token);
    }

    this.state = {
      loggedIn: token ? true : false,
      playlists: [],
      param: 0.5
    };
  }

  // get access and refresh tokens from uri
  // we will need them for making api calls, thats the thing
  getHashParams = () => {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  };

  getPlaylists = () => {
    spotifyApi.getUserPlaylists({ limit: 1 }).then(
      data => {
        this.setState({ playlists: data.items });
      },
      err => {
        console.error(err);
      }
    );
  };

  componentDidMount = () => {
    this.getPlaylists();
    socket.on("values from server", data => {
      this.setState({
        param: data
      });
    });
  };
 // Testar JS för knappar istället för slider 
  
//  var Counter = React.createClass({
//     getInitialState: function(){
//        return {
//          count: 0
//        }
//     },
//     incrementCount: function(){
//       this.setState({
//         count: this.state.count + 1
//       });
//     },
//     decrementCount: function(){
//       this.setState({
//         count: this.state.count - 1
//       });
//     },
//     render: function(){
//       const baseClass = 'counter';
//       const buttonBgState = this.state.count <= 0 ? 'bg-red' : 'bg-blue';
//       return (
//         <div className={`${baseClass} ${buttonBgState}`} data-foo={this.state.count}>
//           <h1>Count: {this.state.count}</h1>
//           <button type="button" onClick={this.incrementCount}>Increment</button>
//           <button type="button" onClick={this.decrementCount}>Decrement</button>
//         </div>
//       );
//     }
//   });
  
//   React.render(<Counter/>, document.getElementById('mount-point'));

  
  render() {
    
    const baseClass = 'counter';
    const buttonBgState = this.state.count <= 0 ? 'bg-red' : 'bg-blue';
    return (
      <div className="App">
        <a href="http://localhost:8888"> Login to Spotify </a>
<<<<<<< HEAD:client/src/App.js
        <div className="sliders">
          <label>
            valence:
            {/* <PrettoSlider
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              defaultValue={this.state.params.valence * 100}
              onChange={this.handleChangevalence}
              min={3}
              max={100}
            /> */}
          </label>
          <label>
            Energy:
            <PrettoSlider
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              defaultValue={this.state.params.energy * 100}
              onChange={this.handleChangeEnergy}
              min={35}
              max={100}
            />
          </label>
          <label>
            Range:
            <PrettoSlider
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              defaultValue={this.state.params.range * 100}
              onChange={this.handleChangeRange}
              min={10}
              max={100}
              step={10}
            />
          </label>
        </div>
        <Playlists data={this.state.playlists} params={this.state.params} />
        <div className={`${baseClass} ${buttonBgState}`} data-foo={this.state.count}>
          <h1>Count: {this.state.count}</h1>
          <button type="button" onClick={this.incrementCount}>Increment</button>
          <button type="button" onClick={this.decrementCount}>Decrement</button>
        </div>
=======
        <div>Energy: {this.state.param}</div>
        <Playlists data={this.state.playlists} param={this.state.param} />
>>>>>>> f87df22f15d97fa1082155a444e56c6d47db70ec:spotify-client/src/App.js
      </div>
    );
  }
}

const Playlists = props =>
  props.data.map(playlist => (
    <Playlist key={playlist.id} playlist={playlist} param={props.param} />
  ));

class Playlist extends Component {
  constructor() {
    super();
    this.state = {
      active: false,
      tracks: []
    };
  }

  getTracks = () => {
    spotifyApi.getPlaylistTracks(this.props.playlist.id).then(
      data => {
        this.setState(prevState => ({
          active: !prevState.active,
          tracks: data.items
        }));
      },
      err => {
        console.error(err);
      }
    );
  };

  render() {
    const { playlist } = this.props;
    const { active, tracks } = this.state;

    return (
      <div>
        <div
          onClick={this.getTracks}
          className={active ? "playlist active" : "playlist"}
        >
          {playlist.name}
        </div>
        {active && (
          <div>
            {tracks.map((track, i) => (
              <Track
                key={i}
                data={track}
                playlist={playlist}
                param={this.props.param}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

class Track extends Component {
  constructor() {
    super();
    this.state = {
      available: false,
      data: {}
    };
  }

  handleClick = () => {
    spotifyApi.play({
      uris: [this.props.data.track.uri]
    });
    this.setState(prevState => ({
      active: !prevState.active
    }));
  };

  getTrackMeta = track => {
    spotifyApi.getAudioFeaturesForTrack(track).then(
      data => {
        this.setState({ data: data });
      },
      err => {
        console.error(err);
      }
    );
  };

  componentDidMount = () => {
    this.getTrackMeta(this.props.data.track.id);
    //this.timerID = setInterval(() => this.isAvailable(), 1000);
  };

  componentDidUpdate(prevProps) {
    if (this.props.param !== prevProps.param) {
      this.isAvailable();
    }
  }

  inRange = (songValue, peopleValue, range) => {
    const min = parseFloat(peopleValue) - range;
    const max = parseFloat(peopleValue) + range;

    console.log("peopleValue: ", peopleValue);
    console.log("range: ", range);
    console.log("min: ", min);
    console.log("max: ", max);

    return songValue >= min && songValue <= max;
  };

  isAvailable = () => {
    const { energy: songEnergy } = this.state.data;
    if (this.inRange(songEnergy, this.props.param, 0.2)) {
      this.setState({
        available: true
      });
    } else {
      this.setState({
        available: false
      });
    }
  };

  render() {
    const { name, artists, album } = this.props.data.track;
    const { available } = this.state;

    return (
      <div
        onClick={this.handleClick}
        className={available ? "track available" : "track"}
      >
        <div className="info">
          <img src={album.images[2].url} />
          {artists[0].name} - {name}
        </div>
        <div className="meta">Energy: {this.state.data.energy}</div>
      </div>
    );
  }
}

export default App;

/*
const App = () => {
  const [activePlaylist, setActivePlaylist] = useState([]);
  const [activeTrack, setActiveTrack] = useState({});
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);

  const actions = (id, action) => {
    switch (action) {
      case "SET_ACTIVE_PLAYLIST":
        spotifyApi.getPlaylistTracks(id).then(
          data => {
            setActivePlaylist(data);
          },
          err => {
            console.error(err);
          }
        );

      case "SET_ACTIVE_TRACK":
        setActiveTrack(id);

      case "SET_PLAYLISTS": //get them?
        setPlaylists(id);
    }
  };

  return (
    <>
      <Library>
        {playlists &&
          playlists.map(playlist => (
            <Playlist actions={actions} data={playlist} />
          ))}
      </Library>
      {playlist && (
        <>
          <Playlist data={playlist} />
          <Tracks actions={actions} data={tracks} />
        </>
      )}
    </>
  );
};
*/
