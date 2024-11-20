import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CourseActions } from "./action-types";
import { CoursesHttpService } from "../services/courses-http.service";
import { concatMap, map, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class CourseEffects {
  constructor(
    private actions: Actions,
    private coursesHttpService: CoursesHttpService,
  ) {}

  loadCourses$ = createEffect(() =>
    this.actions.pipe(
      ofType(CourseActions.loadCourseList),
      concatMap((action) => this.coursesHttpService.findAllCourses()),
      tap((courses) => console.log("courses loaded",courses)),
      map((courses) => CourseActions.courseListLoaded({ courses }))
    )
  );

  saveCourse$= createEffect(()=>
  this.actions.pipe(
    ofType(CourseActions.courseEdited),
    concatMap((action)=>
    this.coursesHttpService.saveCourse(action.updatedCourse.id,action.updatedCourse.changes)
    )
  ),{
    dispatch:false
  })
}
