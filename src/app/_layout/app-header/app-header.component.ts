import { Component, OnInit, Inject } from "@angular/core";
import { APP_CONFIG, AppConfig } from "app-config.module";
import { Store } from "@ngrx/store";
import {
  fetchCurrentUserAction,
  logoutAction,
} from "state-management/actions/user.actions";
import {
  selectIsLoggedIn,
  selectCurrentUserName,
  selectThumbnailPhoto,
} from "state-management/selectors/user.selectors";
import { selectDatasetsInBatchIndicator } from "state-management/selectors/datasets.selectors";

@Component({
  selector: "app-app-header",
  templateUrl: "./app-header.component.html",
  styleUrls: ["./app-header.component.scss"],
})
export class AppHeaderComponent implements OnInit {
  facility = this.appConfig.facility ?? "";
  status = this.appConfig.production ? "" : "test";

  username$ = this.store.select(selectCurrentUserName);
  profileImage$ = this.store.select(selectThumbnailPhoto);
  inBatchIndicator$ = this.store.select(selectDatasetsInBatchIndicator);
  loggedIn$ = this.store.select(selectIsLoggedIn);

  constructor(
    private store: Store,
    @Inject(APP_CONFIG) public appConfig: AppConfig
  ) {}

  logout(): void {
    this.store.dispatch(logoutAction());
  }

  ngOnInit() {
    this.store.dispatch(fetchCurrentUserAction());
  }
}
