import React, { Component, useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { Slider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import update from "immutability-helper";

import "./App.css";

const spotifyApi = new SpotifyWebApi();
const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);

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
      nowPlaying: { name: "Not Checked", albumArt: "" },
      playlists: [],
      params: { energy: 1, valence: 1, range: 0.1 }
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

  getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          albumArt: response.item.album.images[0].url
        }
      });
    });
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
  };

  handleChangevalence = (event, value) => {
    this.setState({
      params: update(this.state.params, { valence: { $set: value / 100 } })
    });
  };

  handleChangeEnergy = (event, value) => {
    this.setState({
      params: update(this.state.params, { energy: { $set: value / 100 } })
    });
  };

  handleChangeRange = (event, value) => {
    this.setState({
      params: update(this.state.params, { range: { $set: value / 100 } })
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
      </div>
    );
  }
}

const Playlists = props =>
  props.data.map(playlist => (
    <Playlist key={playlist.id} playlist={playlist} params={props.params} />
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
                params={this.props.params}
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
    if (
      this.props.params.valence !== prevProps.params.valence ||
      this.props.params.energy !== prevProps.params.energy ||
      this.props.params.range !== prevProps.params.range
    ) {
      this.isAvailable();
    }
  }

  componentWillUnmount() {
    //clearInterval(this.timerID);
  }

  inRange = (songValue, peopleValue, range) => {
    const min = peopleValue - range;
    const max = peopleValue + range;

    return songValue >= min && songValue <= max;
  };

  isAvailable = () => {
    //console.log("this.state.data.valence: ", this.state.data.valence);
    //console.log("this.props.params.valence: ", this.props.params.valence);
    //console.log("this.state.data.energy: ", this.state.data.energy);
    //console.log("this.props.params.energy: ", this.props.params.energy);
    const { valence: songvalence, energy: songEnergy } = this.state.data;
    const {
      valence: peoplevalence,
      energy: peopleEnergy,
      range
    } = this.props.params;

    if (
      this.inRange(songvalence, peoplevalence, range) &&
      this.inRange(songEnergy, peopleEnergy, range)
    ) {
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
        <div className="meta">
          Energy: {this.state.data.energy}, valence: {this.state.data.valence}
        </div>
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
