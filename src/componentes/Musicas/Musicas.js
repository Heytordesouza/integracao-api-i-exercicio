import React, { useState } from 'react'
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'
import axios from 'axios'

const musicasLocal = [{
    artist: "Artista 1",
    id: "1",
    name: "Musica1",
    url: "http://spoti4.future4.com.br/1.mp3"
},
{
    artist: "Artista 2",
    id: "2",
    name: "Musica2",
    url: "http://spoti4.future4.com.br/2.mp3"
},
{
    artist: "Artista 3",
    id: "3",
    name: "Musica3",
    url: "http://spoti4.future4.com.br/3.mp3"
}]



export default function Musicas(props) {
    const [musicas, setMusicas] = useState([])
    const [nome, setNome] = useState("")
    const [artista, setArtista] = useState("")
    const [endereco, setEndereco] = useState("")
    
    const getPlaylistTracks = () => {
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, {
          headers: {
            Authorization: "heytor-de-souza-ammal"
          }
        })
          .then((resposta) => {
            setMusicas(resposta.data.result.tracks)
          })
          .catch((erro) => {
            console.log(erro)
          })
      };
    
    getPlaylistTracks()



    const addTrackToPlaylist = () => {
        const body = {
            name: nome,
            artist: artista,
            url: endereco
        }

        const headers = {
            headers: {
                Authorization: "heytor-de-souza-ammal"
            }
        }

        axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, body, headers)
            .then((resposta) => {
                getPlaylistTracks()
            })
            .catch((erro) => {
                console.log(erro)
            })
    }
        const removeTrackFromPlaylist = (id) => {
            
            const headers = {
                headers: {
                    Authorization: "heytor-de-souza-ammal"
                }
            }
            axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${id}`, headers)
            .then((resposta) => {
                console.log(resposta)
            })
            .catch((erro) => {
                console.log(erro)
            })
        }
      
        const apagarPlaylist = async () => {
            try {
                const headers = {
                    headers: {
                        Authorization: "heytor-de-souza-ammal"
                    }
                }
                const response = await axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}`, headers)
                
            } catch (error) {
                console.log(error)
            }
        }

    return (
        <ContainerMusicas>
            <h2>{props.playlist.name}</h2>
            <button onClick={apagarPlaylist}>Deletar</button>
            {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        <button onClick={() => removeTrackFromPlaylist(musica.id)}>X</button>
                    </Musica>)
            })}

            <ContainerInputs>
                <InputMusica placeholder="artista" 
                 value={artista}
                 onChange={(event) => setArtista(event.target.value)}/>

                <InputMusica placeholder="musica" 
                 value={nome}
                 onChange={(event) => setNome(event.target.value)}/>

                <InputMusica placeholder="url" 
                 value={endereco}
                 onChange={(event) => setEndereco(event.target.value)}/>

                <Botao onClick={addTrackToPlaylist}>Adicionar musica</Botao>

            </ContainerInputs>
        </ContainerMusicas>
    )
}

