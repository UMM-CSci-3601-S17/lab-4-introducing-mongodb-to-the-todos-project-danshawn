import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { Todo } from './todo';
import {Observable} from "rxjs";

@Injectable()
export class TodoListService {
    private baseUrl: string = API_URL;
    constructor(private http:Http) { }

    getTodos(): Observable<Todo[]> {
        let body = this.http.request(this.baseUrl + 'todos').map(res => res.json());
        return body;
    }

    getTodoById(id: string): Observable<Todo> {
        return this.http.request(this.baseUrl + "/" + id).map(res => res.json());
    }
}