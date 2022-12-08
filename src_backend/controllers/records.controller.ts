import express from 'express'
import Records from '../models/records';

export class RecordsController{
    find_all = (req: express.Request, res: express.Response)=>{
        Records.find({},(err,data)=>{
            if(err)console.log(err);
            else res.json(data);
        })
    }
}