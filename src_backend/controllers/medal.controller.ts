import express from 'express'
import Medal from '../models/medal';

export class MedalController{
    find_all = (req: express.Request, res: express.Response)=>{
        Medal.find({},(err,data)=>{
            if(err)console.log(err);
            else res.json(data);
        })
    }
}