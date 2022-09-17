import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import axios from "axios"
import BasicTable from './Table';
function SearchBar(){
    const [name,setName] = useState("");
    const [data,setData] = useState([])
    useEffect(()=>{
        const loadData = async ()=>{
        try{
            const res = await axios.get('http://localhost:8080/user');
            setData(res.data)
            }
            catch (error)
            {
                console.log(error)
            }
        }
        loadData()
    },[])
    const search = async (name)=>
    {
        try{
        const res = await axios.get('http://localhost:8080/user', { params: { name :name } });
        setData(res.data)
        }
        catch (error)
        {
            console.log(error)
        }
    }
    return (
        <div>
            <TextField label="Name" variant="outlined" onChange={(e)=>{
            setName(e.target.value)
            }}/>
            <Button onClick={()=>search(name)} variant="contained" style={{marginLeft:"10px",height : "56px",}}>Search</Button>
            <BasicTable data = {data} onRefresh = {()=> search("")}></BasicTable>
        </div>
    )
}

export default SearchBar;