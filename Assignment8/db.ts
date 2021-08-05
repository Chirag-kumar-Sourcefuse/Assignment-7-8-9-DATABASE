
import {Pool} from 'pg';

export const pool=new Pool(
{
    user:'postgres',
    host:'localhost',
    database:'assign6',
    password:'chiragdb@',
    port:5432
}); 