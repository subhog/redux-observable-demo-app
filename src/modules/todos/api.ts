import { Observable } from "rxjs";
import { ajax, ajaxGet, AjaxResponse } from "rxjs/internal-compatibility";

import { TodoItem } from "./models";

const { REACT_APP_SERVER_URL: SERVER_URL } = process.env;

export function getTodo(id: TodoItem["id"]): Observable<AjaxResponse> {
  return ajaxGet(`${SERVER_URL}/todos/${id}`);
}

export function listTodos(): Observable<AjaxResponse> {
  return ajaxGet(`${SERVER_URL}/todos`);
}

export function createTodo(data: TodoItem): Observable<AjaxResponse> {
  return ajax({
    url: `${SERVER_URL}/todos`,
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function updateTodo(
  id: TodoItem["id"],
  data: TodoItem
): Observable<AjaxResponse> {
  return ajax({
    url: `${SERVER_URL}/todos/${id}`,
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function deleteTodo(id: TodoItem["id"]): Observable<AjaxResponse> {
  return ajax({
    url: `${SERVER_URL}/todos/${id}`,
    method: "DELETE",
  });
}
