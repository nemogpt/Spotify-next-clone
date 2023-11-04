import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/song";
import useSpotify from "./useSpotify"

function useSongInfo() {
    const spotifyAPI = useSpotify();
    const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
    const [songInfo, setSongInfo] = useState(null);

    useEffect(() => {
        const getSongInfo = async () => {
            if (currentTrackId) {
                const trackInfo = await fetch(`http://api.spotify.com/v1/tracks/${currentTrackId}`, {
                    headers: {
                        Authorization: `Bearer ${spotifyAPI.getAccessToken()}`
                    }
                }).then(res => res.json());

                setSongInfo(trackInfo);
            }
        }

        getSongInfo();
    }, []);

    return songInfo;
}

export default useSongInfo
