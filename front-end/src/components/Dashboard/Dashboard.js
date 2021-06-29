import { useState, useEffect } from 'react'
import useAuth from './useAuth'
import TrackSearchResults from '../TrackSearchRes/TrackSearchRes';
import Player from '../Player/Player'
import SpotifyWebApi from 'spotify-web-api-node'
import axios from 'axios';
import './Dashboard.css'

const spotifyApi = new SpotifyWebApi({
    clientId: "0cb5667b7b5d41b99f8ebd01876a3a5c",
})


export default function Dashboard({ code }) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState([])
    const [lyrics, setLyrics] = useState("")

    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch('')
    }

    useEffect (() => {
        if(!playingTrack) return


        axios.get('http://localhost:3001/lyrics', {
            params: {
                track: playingTrack.title,
                artist: playingTrack.artist
            }
        }).then(res => {
            setLyrics(res.data.lyrics)
        })
    }, [playingTrack])

    useEffect(() => {
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if(!search) return setSearchResults([])
        if(!accessToken) return

        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
                if(cancel) return
                setSearchResults(res.body.tracks.items.map(track =>{
                 const smallestAlbumImage = track.album.images.reduce(
                    (smallest, image) => {
                        if(image.height < smallest.height) return image
                        return smallest
                    }, track.album.images[0])

                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImage.url,
                }
            }))
    })

        return () => cancel = true
    }, [search, accessToken])

    return <div className="container-dashboard">
        <form className="form">
            <div className="search">
                <input className="search-bar" placeholder="Search Songs/Artists"
                value={search} onChange={e => setSearch(e.target.value)}></input>
            </div>
        </form>
        <div className="container-tracks">
            {searchResults.map(track => (
                <TrackSearchResults
                track={track} key={track.uri} chooseTrack={chooseTrack}
                />
            ))}
            {searchResults.length == 0 && (
                <div className="lyrics" style={{ whiteSpace: "pre"}}>
                    {lyrics}
                </div>
            )
        }
        </div>

        <div className="player"><Player accessToken={accessToken} trackUri={playingTrack?.uri}/> 
        </div>
    </div>
}


