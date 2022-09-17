import * as React from 'react';
import { Button ,Table ,TableBody , TableCell , TableContainer, TableHead , TableRow , Card,TextField, Dialog , DialogActions , DialogContent , DialogTitle} from '@material-ui/core';
import axios from "axios"

export default function BasicTable(props) {
    const [open,setOpen] = React.useState(false)
    const [id, setId] = React.useState()
    const [username,setUserName] = React.useState()
    const [email,setEmail] = React.useState()
    const [birthday,setBirthday] = React.useState()
    const data = props.data
    const onRefresh = props.onRefresh
    function formatDate(date) {
        let d  = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
        return [year, day, month].join('-');
    }
    const Update = async () =>{
      const updateUser = {
        _id : id,
        username,
        email,
        birthday
      }
      try{
        const res = await axios.post('http://localhost:8080/user/update' , [updateUser]);
        console.log(res)
        onRefresh()
        setOpen(false)
        }
        catch (error)
        {
            console.log(error)
        }
    }
    
    return (
      <>
      <TableContainer component={Card}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{fontWeight: 'bold'}}>Username</TableCell>
              <TableCell align="center" style={{fontWeight: 'bold'}}>Email</TableCell>
              <TableCell align="center" style={{fontWeight: 'bold'}}>Birthday</TableCell>
              <TableCell align="center" style={{fontWeight: 'bold'}}>Click to update users</TableCell>
            </TableRow>
          </TableHead>
          {
          data &&
          <TableBody>
            {data.map((user) => (
              <TableRow
                key={user._id}
              >
                <TableCell component="th" scope="row">
                  {user.username}
                </TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{formatDate(user.birthday)}</TableCell>
                <TableCell align="center" >
                  <Button variant='contained' onClick={()=>{
                    setOpen(true)
                    setId(user._id)
                    setBirthday(user.birthday)
                    setEmail(user.email)
                    setUserName(user.username)
                  }}>
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          }
        </Table>
      </TableContainer>
      {id &&
      <Dialog open={open} onClose={()=>setOpen(false)}>
        <DialogTitle>Change Information</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={username}
            onChange = {(e) => setUserName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            defaultValue={email}
            onChange = {(e) => setEmail(e.target.value)}
          />
          <TextField
          id="date"
          label="Birthday"
          type="date"
          defaultValue={formatDate(birthday)}
          onChange = {(e) => setBirthday(e.target.value)}
          fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Cancel</Button>
          <Button onClick={()=>Update()}>Update</Button>
        </DialogActions>
      </Dialog>
      }
      </>
    );
}