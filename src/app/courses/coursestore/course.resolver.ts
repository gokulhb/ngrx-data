import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Course } from "../model/course";
import { inject } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../reducers";
import { filter, finalize, first, map, mergeMap, tap } from "rxjs/operators";
import { CourseActions } from "./action-types";
import { getAllCourses, getIsCoursesLoaded } from "./course.selectors";

// export class CourseResolver implements Resolve<Course[]>{
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//         return []
//     }
    
// }

// export const CourseResolver: ResolveFn<Course[]>=(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

//     let store=inject(Store<AppState>)
//   return  store.pipe(
//     select(getIsCoursesLoaded),
//     tap((isCoursesLoaded)=>{
//         if(!isCoursesLoaded){
//             store.dispatch(CourseActions.loadCourseList())
//         }
//     }),
//     filter((isCoursesLoaded)=>isCoursesLoaded),
//     map((isCoursesLoaded)=>select(getAllCourses)),
//     first(),
//     finalize(() => {
//     })
   
   
   
// )
    
// }
// export const CourseResolver: ResolveFn<Course[]> = (
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ) => {
//     let store = inject(Store<AppState>);
  
//     return store.pipe(
//       select(getIsCoursesLoaded),
//       tap((isCoursesLoaded) => {
//         if (!isCoursesLoaded) {
//           store.dispatch(CourseActions.loadCourseList());
//         }
//       }),
//       filter((isCoursesLoaded) => isCoursesLoaded),
//       map(() => store.pipe(select(getAllCourses)))
//       // Add any additional operators as needed
//     );
//   };
export const CourseResolver: ResolveFn<Course[]> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    let store = inject(Store<AppState>);
  
    return store.pipe(
      select(getIsCoursesLoaded),
      tap((isCoursesLoaded) => {
        if (!isCoursesLoaded) {
          store.dispatch(CourseActions.loadCourseList());
        }
      }),
      filter((isCoursesLoaded) => isCoursesLoaded),
      mergeMap(() => store.pipe(select(getAllCourses))),
      tap(() =>console.log('running')),
      first(),
       finalize(() => {
    })
    //   map(() => store.pipe(select(getAllCourses)))
      // Add any additional operators as needed
    );
  };