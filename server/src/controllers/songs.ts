import { Request, Response, NextFunction } from 'express';
import { DB } from '../Database';
import axios, { AxiosResponse } from 'axios';
import path from 'path';

interface Song {
    id: number, 
    title: string,
    notes: string,
}

export const getSongs = async (req: Request, res: Response, next: NextFunction) => {
    // get songs from the db 
    try {
        const songs = await DB.runQuery(path.join('get_songs'));
        
        return res.status(200).json({
            message: "Successfully got all songs",
            songs: songs
        });
    }
    catch(err) {
        next(err);
    }
};

export const getSong = async (req: Request, res: Response, next: NextFunction) => {
    // get a song from the db 
    try {
        let title: string = req.params.title; 
            title = '%' + title + '%';

        if(!title) {
            return res.status(400).json({
                message: "Invalid URL parameter sent from request"
            });
        }

        const songs = await DB.runQuery(path.join('get_song'), title);
        
        return res.status(200).json({
            message: "Successfully got songs which matched the search term",
            songs: songs
        });
    }
    catch(err) {
        next(err);
    }
};


export const updateSong = async (req: Request, res: Response, next: NextFunction) => {
    // update a song from the db 
    try {
        const { newTitle } = req.query;
        const songId: string = req.params.id;

        if(!newTitle || !songId) {
            return res.status(400).json({
                message: "Invalid query parameters sent from request"
            });
        }

        const data = await DB.runQuery(path.join('update_song'), newTitle, songId);

        return (data) ? 
            res.status(200).json({
                message: "Updated a song successfully",
                data: data
            }) 
            : res.status(204).json({
                message: `Failed to update song with id ${songId}`
            });
    }
    catch(err) {
        next(err);
    }
};


export const deleteSong = async (req: Request, res: Response, next: NextFunction) => {
    // delete a song from the db 
    try {
        const songId: string = req.params.id;
        
        if(!songId) {
            return res.status(400).json({
                message: "Invalid body sent from request"
            });
        }

        const data = await DB.runQuery(path.join('delete_song'), songId);

        return (data) ? 
            res.status(200).json({
                message: "Deleted a song successfully",
                data: data
            }) 
            : res.status(204).json({
                message: `Failed to delete song with id ${songId}`
            });
    }
    catch(err) {
        next(err);
    }
};

export const addSong = async (req: Request, res: Response, next: NextFunction) => {
    // add a song from the db 
    try {
        const { song_title, song } = req.body;

        if(!song_title || !song) {
            return res.status(400).json({
                message: "Invalid body sent from request"
            });
        }
        
        const notes: string = song.join(" ");
        const data = await DB.runQuery(path.join('insert_song'), song_title, notes);

        return res.status(201).json({
            message: "Successfully added a new song",
            data: data
        });
    }
    catch(err) {
        next(err);
    }
};