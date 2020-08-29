import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  pessoa: any;

  constructor(private http: HttpClient) { }

  getPeople(){
    return this.http.get('https://agendjango.herokuapp.com/api/pessoas/');
  }

  createPerson(person){
    return this.http.post('https://agendjango.herokuapp.com/api/pessoas/', person);
  }

  updatePerson(id, person){
    return this.http.put('https://agendjango.herokuapp.com/api/pessoas/' + id + '/', person);
  }

  deletePerson(id){
    return this.http.delete('https://agendjango.herokuapp.com/api/pessoas/' + id);
  }
}
