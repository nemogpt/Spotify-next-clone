import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlist";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

function Main() {
  const spotifyAPI = useSpotify();
  const { data: session } = useSession();
  const [color, setColor] = useState("");
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop() as string);
  }, [playlistId]);

  useEffect(() => {
    spotifyAPI
      .getPlaylist(playlistId)
      //@ts-ignore
      .then((data) => setPlaylist(data.body))
      .catch((error) => console.error(error));
  }, [spotifyAPI, playlistId]);
  return (
    <div className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={session?.user?.image as string}
            alt="Profile Image"
            className="rounded-full w-10 h-10"
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8 w-full`}
      >
          {/* @ts-ignore */}
        <img className="h-44 w-44 shadow-2xl" src={playlist?.images?.[0]?.url} alt="" />
        <div>
            <p>PLAYLIST</p>
            {/* @ts-ignore */}
            <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
        </div>
      </section>
      <div>
          <Songs />
      </div>
    </div>
  );
}

export default Main;
