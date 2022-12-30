import React, {  useState, useEffect } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios";

const playlistsLocal = [
    {
        id: 1,
        name: "Playlist 1"
    },
    {
        id: 2,
        name: "Playlist 2"
    },
    {
        id: 3,
        name: "Playlist 3"
    },
    {
        id: 4,
        name: "Playlist 4"
    },
    {
        id: 5,
        name: "Playlist 5"
    },
]

function Playlists() {
    const [playlists, setPlaylists] = useState([])
    const [buscarPlaylist, setbuscarPlaylist] = useState([])

    const headers = {
        headers: {
            Authorization: "heytor-de-souza-ammal"
          }
    }
  
    const getAllPlaylists = () => {
    
        axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists", headers)
          .then((resposta) => {
            setPlaylists(resposta.data.result.list)
          })
          .catch((erro) => {
            console.log(erro)
          })
      }
    
      useEffect(() => {
        getAllPlaylists()
      }, [])



      const searchPlaylist = async() => {
        try {
            const headers = {
                headers: {
                    Authorization: "heytor-de-souza-ammal"
                  }
            }
            const response = await axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/search?name=${buscarPlaylist}`,  headers)
            console.log(response.data)
            setbuscarPlaylist(response.data.result.playlist)

          } catch (error) {
            console.log(error)
        }
      }

    



    return (
        <div>
            <input placeholder="procurar playlist"
            value={buscarPlaylist}
            onChange={(event) => setbuscarPlaylist(event.target.value)}/>
            <button onClick={searchPlaylist}>Buscar Playlist</button>

            {playlists.map((playlist) => {
                return <Musicas id={playlists.id} key={playlist.id} playlist={playlist}/>
            })}

        </div>
    );
}

export default Playlists;
