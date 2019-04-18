import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { LogbookApi } from "shared/sdk/services";
import { Logbook } from "shared/sdk/models";

@Injectable({
  providedIn: "root"
})
export class LogbookService {
  constructor(private logbookApi: LogbookApi) {}

  getLogbooks(): Observable<Logbook[]> {
    return this.logbookApi.findAll();
  }

  getLogbook(name: string): Observable<Logbook> {
    return this.logbookApi.findByName(name);
  }

  getSearchedEntries(name: string, query: string): Observable<Logbook> {
    return this.logbookApi.findEntries(name, query);
  }

  getFilteredEntries(name: string, query: string): Observable<Logbook> {
    return this.logbookApi.filterEntries(name, query);
  }
}
