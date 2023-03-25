import { INSERT_BOARD,NOTE_LIST } from "./types";
import axios from 'axios';



export function insertBoard(dataToSubmit){
    const request = axios.post('/api/notelist/user', dataToSubmit)
    .then(response => response.data)

return {
    type: INSERT_BOARD,
    payload: request
}
}

export function noteList() {
    const request = axios.get('/api/notelist').then((response) => response.data);
  
    return {
      type: NOTE_LIST,
      payload: request,
    };
  }

export function putnoteList(no,dataToSubmit){
    const request = axios.put(`/api/notelist/${no}`,dataToSubmit)
    .then(response => response.data)

return { 
    type: NOTE_LIST,
    payload: request 
}
}

export function deleteNote(no){
    const request = axios.delete(`/api/notelist/${no}`)
    .then(response => response.data)

return {
    type: NOTE_LIST,
    payload: request
}
}

