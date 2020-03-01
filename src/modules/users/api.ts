import { Observable } from "rxjs";
import { ajaxGet, AjaxResponse } from "rxjs/internal-compatibility";

import { User } from "./models";

const { REACT_APP_SERVER_URL: SERVER_URL } = process.env;

export function getUser(id: User["id"]): Observable<AjaxResponse> {
  return ajaxGet(`${SERVER_URL}/users/${id}`);
}

export function listUsers(): Observable<AjaxResponse> {
  return ajaxGet(`${SERVER_URL}/users`);
}
