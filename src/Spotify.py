from tkinter import Tk, ttk
from typing import List
from dotenv import load_dotenv
import spotipy
from spotipy import Spotify
from spotipy.oauth2 import SpotifyClientCredentials
from distutils import util
from Song import Song
import Spotify


def getSpotifyClient():
    load_dotenv()  # Environment variables must be loaded first
    return spotipy.Spotify(
        client_credentials_manager=SpotifyClientCredentials())


def getSongs(spotify, songName, artistName, limit=50) -> List[Song]:
    results = spotify.search(
        q="track:\""+songName+"\"+artist:\""+artistName+"\"", type="track", limit=limit
    )
    tracks = results["tracks"]
    items = tracks["items"]
    songs = []
    for item in items:
        songs.append(Song(item))
    return songs


def getSongs(spotify, songName, artistName, limit=50) -> List[Song]:
    results = spotify.search(
        q="track:\""+songName+"\"+artist:\""+artistName+"\"", type="track", limit=limit
    )
    tracks = results["tracks"]
    items = tracks["items"]
    songs = []
    for item in items:
        songs.append(Song(item))
    return songs


def getSong(spotify, songName, artistName):
    songs = getSongs(spotify, songName, artistName, 1)
    return songs[0]

<<<<<<< HEAD

=======
>>>>>>> main
def getRecommendedSongs(spotify: Spotify, seedSongs: List[Song], discardedSongs: List[Song]) -> List[Song]:
    seedSongIds = []
    for song in seedSongs:
        seedSongIds.append(song.uri)

<<<<<<< HEAD
    if (len(seedSongIds) == 0):
        return []
=======
>>>>>>> main
    results = spotify.recommendations(seed_tracks=seedSongIds, limit=15, )
    tracks = results["tracks"]

    recSongs = []
    for track in tracks:
        song = Song(track)
        recSongs.append(song)

    verifiedSongs = []
    for recSong in recSongs:
        verifySong = True
        for discardSong in discardedSongs:
            if recSong.uri == discardSong.uri:
                verifySong = False
        if verifySong:
            verifiedSongs.append(recSong)

    returnVerifySongs = verifiedSongs[1:5]

    return returnVerifySongs
<<<<<<< HEAD


def getSongsByIds(spotify, stringIDs: List[str]) -> List[Song]:
    if len(stringIDs) == 0 or stringIDs[0] is None:
        return []
    result = spotify.tracks(stringIDs)
    tracks = result["tracks"]
    recSongs = []
    for track in tracks:
        song = Song(track)
        recSongs.append(song)

    return recSongs
=======
>>>>>>> main


def printSong(song: Song):
    print(song.name)
