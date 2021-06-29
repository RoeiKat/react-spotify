import React from 'react'

export default function TrackSearchRes( {track, chooseTrack } ) {
    function handlePlay() {
        chooseTrack(track)
    }
    return (
    <div className="track"
    onClick={handlePlay}
    > 
        <img src={track.albumUrl} style={{height: '64px', width: '64px'}} />
        <div>
            <div>{track.title}</div>
            <div>{track.artist}</div>
        </div>
    </div>
    )
}
