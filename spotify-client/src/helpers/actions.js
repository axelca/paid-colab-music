import spotifyApi from "spotify-web-api-js";

const actions = (id, action) => {
  switch (action) {
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
  }
};

export default actions;
