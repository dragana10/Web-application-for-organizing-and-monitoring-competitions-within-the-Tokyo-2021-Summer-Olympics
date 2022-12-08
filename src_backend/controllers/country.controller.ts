import express from 'express'
import Country from '../models/country';

export class CountryController{
    find_all = (req: express.Request, res: express.Response)=>{
        Country.find({},(err,data)=>{
            if(err)console.log(err);
            else res.json(data);
        })
    }
}