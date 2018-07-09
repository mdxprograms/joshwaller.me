import { h, app } from "hyperapp";
import axios from "axios";

const state = {
  artists: [],
  currentArtist: {
    name: "",
    albums: []
  },
  currentVideoUrl: ""
};

const actions = {
  fetchArtists: () => async (state, actions) => {
    const artists = await axios.get("/api/music.json").then(res => res.data);
    actions.saveArtists(artists);
  },
  saveArtists: artists => state => ({ artists }),
  fetchArtist: artistName => async (state, actions) => {
    const artist = await axios.get(`/api/music/${artistName}.json`).then(res => res.data);
    actions.saveCurrentVideoUrl("");
    actions.saveCurrentArtist(artist);
  },
  saveCurrentArtist: currentArtist => state => ({ currentArtist }),
  setCurrentVideoUrl: currentVideoUrl => (state, actions) => {
    let vidUrl = "";

    if (currentVideoUrl.includes("list=")) {
      const parts = currentVideoUrl.split("&list=");

      vidUrl = `https://www.youtube.com/embed/videoseries?list=${parts[1]}`;
    } else {
      vidUrl = currentVideoUrl.replace("watch?v=", "embed/");
    }

    actions.saveCurrentVideoUrl(vidUrl);
  },
  saveCurrentVideoUrl: currentVideoUrl => state => ({ currentVideoUrl })
};

const AlbumGridView = ({ artist, setCurrentVideoUrl }) => (
  <article>
    <div class="cf pa2">
      {artist.albums.map(album => (
        <div class="fl w-50 w-25-m w-20-l pa2">
            <a onclick={(e) => { e.preventDefault(); setCurrentVideoUrl(album.url);}} href={album.url} class="db link dim tc">
            <img src={album.img} alt={album.title} class="w-100 db outline black-10"/>
            <dl class="mt2 f6 lh-copy">
                <dt class="clip">Title</dt>
                <dd class="ml0 black truncate w-100">{album.title}</dd>
                <dt class="clip">Artist</dt>
                <dd class="ml0 gray truncate w-100">{artist.name}</dd>
            </dl>
            </a>
        </div>
      ))}
    </div>
  </article>
);

const view = (state, actions) => (
  <div oncreate={actions.fetchArtists}>
    <select onchange={e => actions.fetchArtist(e.target.value)}>
      <option selected disabled>Select an Artist</option>
      {state.artists.map(item => <option value={item.artist} key={item.artist}>{item.artist}</option>)}
    </select>

    <hr />

    <div class="player">
      <h1>{state.currentArtist.name}</h1>
      {state.currentVideoUrl.length > 0 && (
        <iframe width="560" height="315" src={state.currentVideoUrl || ""} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen />
      )}
      {state.currentArtist.albums.length > 0 && (
        <AlbumGridView artist={state.currentArtist} setCurrentVideoUrl={actions.setCurrentVideoUrl}/>
      )}
    </div>
  </div>
);

if (document.getElementById("music")) {
  app(state, actions, view, document.getElementById("music"));
}
