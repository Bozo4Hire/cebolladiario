import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from "react-hot-toast"
import { UserContext } from '../../context/userContext'
import { Container, InputGroup, FormControl, Button, Row, Card, CardBody, CardTitle} from 'react-bootstrap';

const CLIENT_ID = "b5f988fe473d4a5ea9aacfb79665fb1b";
const CLIENT_SECRET = "11a4b27d7c2d4026882d0412744489b1";

export default function Dashboard() {
  
  const { user } = useContext(UserContext)
  //const navigate = useNavigate()

  const [aux, setAux] = useState(null)

  const [data, setData] = useState({
    content: '',
    date: new Date(),
    user_id: '',
    name: '',
    song_id: '',
    song_url: '',
    song_name: '',
    song_ic_url:''
  })

  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [selAlbum, setSelAlbum] = useState("");
  const [tracks, setTracks] = useState([]);
  const [selTrack, setSelTrack] = useState({
    trackName: "",
    trackId: "",
    trackURL: "",
    trackAlImSrc: "",
  });

  const [entries, setEntries] = useState({
    entries: [],
    username: '',
    user_id: '',
  })

  const getEntries = async () => {
    
    axios.get('/profile').then(({data}) => {
      setAux(data)
    })
    console.log(aux.id)
    const res = await axios.get('/api/entries', { params: { id: aux.id } })
    const newdata = res.data
    setEntries({ ...entries, entries: newdata })
    //console.log(entries.entries)

  }

  useEffect(() => {
    axios.get('/profile').then(({data}) => {
      setAux(data)
    })
    getEntries()
  }, [])


  const registerEntry = async (e) => {
    e.preventDefault();
    const { content, date, user_id, name, song_id, song_name, song_url, song_ic_url } = data
    try {
      const { data } = await axios.post('/api/entries', {
        content, date, user_id, name, song_id, song_name, song_url, song_ic_url
      })
      if (data.error) {
        toast.error(data.error)
      }
      else {
        //setData({})
        setData({...data,
          content: '',
          date: new Date(),
          user_id: '',
          name: '',
          song_id: '',
          song_url: '',
          song_name: '',
          song_ic_url:''
        });
        toast.success('Entry registered Succesfully');
        getEntries();
        //window.location.reload();

      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteEntry = async (id) => {
    await axios.delete('/api/entries/' + id);
    getEntries();
}

  const parseHour = (d) => {
    const event = new Date(d)
    return event.toLocaleTimeString('en-US', {timeZone: 'America/Los_Angeles'})
  }

  const parseDate = (d) => {
    const event = new Date(d)
    return event.toLocaleDateString('en-US', {timeZone: 'America/Los_Angeles'})
  }
  
  /*********************************************************************************************************/
  //  Spotify API
  /*********************************************************************************************************/
  useEffect(() =>{
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, [])


  // const registerEntry = async (e) =>
  const search = async() => {
    console.log("Search for " + searchInput)
    var searchParameters = {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken 
      }
    }

    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
      .then(response => response.json())
      .then(data => {return data.artists.items[0].id})
    //console.log("Artisit ID is " + artistID)

    var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
      .then(response => response.json())
      .then(data => {
        //console.log(data)
        setAlbums(data.items)
      }) 
      //console.log(albums)
  }

  const searchOnAlbum = async (s) => {
    var searchParameters = {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken 
      }
    }
      var tracksR = await fetch('https://api.spotify.com/v1/albums/' + s.id + '/tracks', searchParameters)
      .then(response => response.json())
      .then(data => {
        //console.log(data)
        setTracks(data.items)
        setSelAlbum(s)
      })
      console.log(tracks)
  }

  const onSelectTrack = async () => {
    setSelAlbum(""); 
    setTracks([]);
    setAlbums([]);
  }

  const onSubmit = async () => {
    getEntries();
    setTracks([]);
    setAlbums([]);
    setSelTrack({});
  }

  return (
    <div>
      
      <h1>My Diary</h1>
      {!!user && (<h2>Hi {user.name}!</h2>)}
      <a onClick={onSubmit} class="btn btn-info btn-lg">
          Refresh
        </a>
      <ul className="list-group">
        {entries.entries.map(entry => (
          <li className="list-group-item list-group-item-action">
            <div class="d-flex justify-content-between align-items-center">
            <small>{parseDate(entry.date)} @ {parseHour(entry.date)}</small></div>
            <div class="card p-3">
              <div class="d-flex justify-content-between align-items-center">
                
                  <span><small class="font-weight-bold">{entry.content}</small></span>
                
              </div>
            </div>

            {entry.song_id !== '' && (
                <li className="list-group-item list-group-item-action bold" style={{ display: 'flex', alignItems: 'center', marginTop:'10px' }}>
                  <img width="5%" src={entry.song_ic_url} alt={entry.song_name} />
                  <a href={entry.song_url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px' }}>
                    {entry.song_name}
                  </a>
                </li>
              )}

            <button 
              type="button" 
              class="btn btn-danger"
              onClick={() => deleteEntry(entry._id)}
              style={{ marginTop: '10px'}}
              >
                Delete</button>
          </li>
        ))}
        <li className="list-group-item list-group-item-action">
          <div class="d-flex justify-content-between align-items-center" style={{marginBottom:'5px' }}>
            New Entry
          </div>
         
          <div class="d-flex justify-content-between">
            <form onSubmit={registerEntry} class="w-100">
              <textarea
                placeholder='Type something...'
                class="input-group-text w-100 h-80"
                style={{ boxSizing: 'border-box', resize: 'none', textAlign: 'justify' }}
                value={data.content}
                onChange={(e) => setData({ ...data, 
                  content: e.target.value, 
                  user_id: user.id, 
                  name: user.name, 
                  date: new Date()
                 })}
              />
              <li className="list-group-item list-group-item-action bold" style={{ display: 'flex', alignItems: 'center' }}>
                <img width="10%" src={selTrack.trackAlImSrc} alt={selTrack.trackName} />
                <a href={selTrack.trackURL} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px' }}>{selTrack.trackName}</a>
                
              </li>
              <button type='submit' onClick={onSubmit} style={{ marginTop: '10px', marginBottom:'5px' }}>
                Post
              </button>
            </form>
          </div>
          <div class="d-flex justify-content-between align-items-center" style={{marginBottom:'5px' }}>
            Add a Song
          </div>
          <div className="SpotifyAPI">
      <Container>
        <Container>
          <InputGroup className='mb-3' size='lg'>
            <FormControl
              placeholder='Search for Artist'
              type='input'
              onKeyPress={event =>{
                if(event.key == "Enter"){
                  search(); setSelAlbum(""); setTracks([])
                }
              }}
              onChange={event => {
                  setSearchInput(event.target.value); 
                  search();
                }}/>
              <Button onClick={() => {search(); setSelAlbum(""); setTracks([])}}>
                Search
              </Button>
          </InputGroup>
        </Container>
        <Container>
          <Row className='mx-2 row row-cols-4'>
            {albums.map((album,i) => {
              //console.log(album);
              return(
                <Card onClick={() => {
                  searchOnAlbum(album);
                  }}>
                  <Card.Img width="5%" src={album.images[0].url} />
                  <CardBody>
                    <CardTitle>{album.name}</CardTitle>
                  </CardBody>
                </Card>
              )
            })}
          </Row>
        </Container>
          <ul className="list-group">
          <li 
                className="list-group-item list-group-item-action bold"><h2>{selAlbum.name}</h2></li>
              {tracks.map((track,j) => { 
                return(
                  <li 
                    className="list-group-item list-group-item-action"
                    onClick={() => { 
                      setSelTrack({...selTrack, 
                        trackName: track.name, 
                        trackId: track.id,
                        trackURL: track.external_urls.spotify,
                        trackAlImSrc: selAlbum.images[0].url
                      });
                      setData({ ...data, 
                        song_id: track.id, 
                        song_name: track.name,
                        song_url: track.external_urls.spotify,
                        song_ic_url: selAlbum.images[0].url
                       })
                      onSelectTrack()
                    }}
                    >
                    {track.name}
                  </li>
                )
              })}
            </ul>
            
      </Container>
    </div>

        </li>
      </ul>

    </div>
  )
}
