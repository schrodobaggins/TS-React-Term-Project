import { DispatchAction } from '../Reducer';
import axios from 'axios';
import React from 'react';

export const getSongs = async (dispatch: React.Dispatch<DispatchAction>) => {
    try {
        const res = await axios.get('/api/songs', {
            headers: {
                'Content-Type': 'application/json'
            }
        });    

        if(res.status === 200) {
            dispatch(new DispatchAction('SET_SONGS', { songs: res.data.songs }));
        }
    }
    catch(err) {
        console.error(err);
    }
};

export const getSong = async (dispatch: React.Dispatch<DispatchAction>,
                              songTitle: string) => {
    try {
        const res = await axios.get(`/api/songs/${songTitle}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
      
        if(res.status === 200) {
            dispatch(new DispatchAction('SET_SONGS', { songs: res.data.songs }));
        }
    }
    catch(err) {
      console.error(err);
    }
};

export const updateSong = async(dispatch: React.Dispatch<DispatchAction>,
                                newTitle: string,
                                songId: number) => {
    try {
        const res = await axios.put(`/api/songs/${songId}`, null, { params: { newTitle: newTitle } });

        if(res.status === 200) {
            await getSongs(dispatch);
        }
    }
    catch(err) {
        console.error(err);
    }
};

export const addSong = async (dispatch: React.Dispatch<DispatchAction>, 
                              songTitle: string, 
                              song: string[]) => {
    try {
        const body = {
            song_title: songTitle,
            song: song,  
        };

        const res = await axios.post('/api/songs', body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        // successful creation of new song
        if(res.status === 201) {
            await getSongs(dispatch);
        }
    }
    catch(err) {
        console.error(err);
    }
};

export const deleteSong = async(dispatch: React.Dispatch<DispatchAction>,
                                songId: number) => {
    try {
        const res = await axios.delete(`/api/songs/${songId}`);

        if(res.status === 200) {
        await getSongs(dispatch);
        }
    }
    catch(err) {
        console.error(err);
    }
};