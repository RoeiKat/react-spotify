import React from 'react'
import './Login.css'

const AUTH_URL =
 "https://accounts.spotify.com/authorize?client_id=0cb5667b7b5d41b99f8ebd01876a3a5c&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
    return ( 
        <div className="container-login">
            <a className="button" href={AUTH_URL}>Login with Spotify</a>
        </div>
    )
}
