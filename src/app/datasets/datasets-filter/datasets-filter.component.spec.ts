import { NO_ERRORS_SCHEMA } from "@angular/core";
import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";
import { Store, StoreModule } from "@ngrx/store";
import { rootReducer } from "state-management/reducers/root.reducer";
import {
  DatasetsFilterComponent,
  DateRange
} from "datasets/datasets-filter/datasets-filter.component";
import {
  MockActivatedRoute,
  MockRouter,
  MockStore
} from "../../shared/MockStubs";
import { ActivatedRoute, Router } from "@angular/router";
import {
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule,
  MatDatepickerInputEvent,
  MatDatepickerInput
} from "@angular/material";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ScientificConditionDialogComponent } from "datasets/scientific-condition-dialog/scientific-condition-dialog.component";
import { APP_CONFIG } from "app-config.module";
import { FacetCount } from "state-management/state/datasets.store";
import {
  SetSearchTermsAction,
  AddLocationFilterAction,
  RemoveLocationFilterAction,
  AddGroupFilterAction,
  RemoveGroupFilterAction,
  AddKeywordFilterAction,
  RemoveKeywordFilterAction,
  AddTypeFilterAction,
  RemoveTypeFilterAction
} from "state-management/actions/datasets.actions";

describe("DatasetsFilterComponent", () => {
  let component: DatasetsFilterComponent;
  let fixture: ComponentFixture<DatasetsFilterComponent>;

  let store: MockStore;
  let dispatchSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        MatAutocompleteModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({ rootReducer })
      ],
      declarations: [
        DatasetsFilterComponent,
        ScientificConditionDialogComponent
      ]
    });
    TestBed.overrideComponent(DatasetsFilterComponent, {
      set: {
        providers: [
          {
            provide: APP_CONFIG,
            useValue: {
              scienceSearchEnabled: false
            }
          },
          { provide: Router, useClass: MockRouter },
          { provide: ActivatedRoute, useClass: MockActivatedRoute }
        ]
      }
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([Store], (mockStore: MockStore) => {
    store = mockStore;
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  it("should contain a date range field", () => {
    const compiled = fixture.debugElement.nativeElement;
    const beamline = compiled.querySelector(".date-input");
    expect(beamline).toBeTruthy();
    expect(
      beamline.attributes.getNamedItem("placeholder").textContent
    ).toContain("Select a date range");
  });

  it("should contain a beamline input", () => {
    const compiled = fixture.debugElement.nativeElement;
    const beamline = compiled.querySelector(".location-input");
    expect(beamline).toBeTruthy();
    expect(
      beamline.attributes.getNamedItem("placeholder").textContent
    ).toContain("Location");
  });

  it("should contain a groups input", () => {
    const compiled = fixture.debugElement.nativeElement;
    const group = compiled.querySelector(".group-input");
    expect(group).toBeTruthy();
    expect(group.attributes.getNamedItem("placeholder").textContent).toContain(
      "Group"
    );
  });

  it("should contain a type input", () => {
    const compiled = fixture.debugElement.nativeElement;
    const type = compiled.querySelector(".type-input");
    expect(type).toBeTruthy();
    expect(type.attributes.getNamedItem("placeholder").textContent).toContain(
      "Type"
    );
  });

  it("should contain a clear button", () => {
    const compiled = fixture.debugElement.nativeElement;
    const btn = compiled.querySelector(".clear-button");
    expect(btn.textContent).toContain("Clear");
  });

  describe("#getFacetId()", () => {
    it("should return the FacetCount id if present", () => {
      const facetCount: FacetCount = {
        _id: "test1",
        count: 0
      };
      const fallback = "test2";

      const id = component.getFacetId(facetCount, fallback);

      expect(id).toEqual("test1");
    });

    it("should return the FacetCount id if present", () => {
      const facetCount: FacetCount = {
        count: 0
      };
      const fallback = "test";

      const id = component.getFacetId(facetCount, fallback);

      expect(id).toEqual(fallback);
    });
  });

  describe("#getFacetCount()", () => {
    it("should return the FacetCount", () => {
      const facetCount: FacetCount = {
        count: 0
      };

      const count = component.getFacetCount(facetCount);

      expect(count).toEqual(facetCount.count);
    });
  });

  describe("#textSearchChanged()", () => {
    it("should dispatch a SetSearchTermsAction", () => {
      dispatchSpy = spyOn(store, "dispatch");

      const terms = "test";
      component.textSearchChanged(terms);

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(new SetSearchTermsAction(terms));
    });
  });

  describe("#locationSelected()", () => {
    it("should dispatch an AddLocationFilterAction", () => {
      dispatchSpy = spyOn(store, "dispatch");

      const location = "test";
      component.locationSelected(location);

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        new AddLocationFilterAction(location)
      );
    });
  });

  describe("#locationRemoved()", () => {
    it("should dispatch a RemoveLocationFilterAction", () => {
      dispatchSpy = spyOn(store, "dispatch");

      const location = "test";
      component.locationRemoved(location);

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        new RemoveLocationFilterAction(location)
      );
    });
  });

  describe("#groupSelected()", () => {
    it("should dispatch an AddGroupFilterAction", () => {
      dispatchSpy = spyOn(store, "dispatch");

      const group = "test";
      component.groupSelected(group);

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(new AddGroupFilterAction(group));
    });
  });

  describe("#groupRemoved()", () => {
    it("should dispatch a RemoveGroupFilterAction", () => {
      dispatchSpy = spyOn(store, "dispatch");

      const group = "test";
      component.groupRemoved(group);

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        new RemoveGroupFilterAction(group)
      );
    });
  });

  describe("#keywordSelected()", () => {
    it("should dispatch an AddKeywordFilterAction", () => {
      dispatchSpy = spyOn(store, "dispatch");

      const keyword = "test";
      component.keywordSelected(keyword);

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        new AddKeywordFilterAction(keyword)
      );
    });
  });

  describe("#keywordRemoved()", () => {
    it("should dispatch a RemoveKeywordFilterAction", () => {
      dispatchSpy = spyOn(store, "dispatch");

      const keyword = "test";
      component.keywordRemoved(keyword);

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        new RemoveKeywordFilterAction(keyword)
      );
    });
  });

  describe("#typeSelected()", () => {
    it("should dispatch an AddTypeFilterAction", () => {
      dispatchSpy = spyOn(store, "dispatch");

      const type = "string";
      component.typeSelected(type);

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(new AddTypeFilterAction(type));
    });
  });

  describe("#typeRemoved()", () => {
    it("should dispatch a RemoveTypeFilterAction", () => {
      dispatchSpy = spyOn(store, "dispatch");

      const type = "string";
      component.typeRemoved(type);

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        new RemoveTypeFilterAction(type)
      );
    });
  });

  describe("#dateChanged()", () => {
    xit("should dispatch a SetDatRangeFilterAction", () => {});
  });

  describe("#clearFacets()", () => {
    it("should", () => {});
  });

  describe("#showAddConditionDialog()", () => {
    it("should", () => {});
  });

  describe("#removeCondition()", () => {
    it("should", () => {});
  });
});
