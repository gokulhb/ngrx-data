import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromCourses from "../reducers/course.reducers"
import { CourseState } from "../reducers/course.reducers";
import e from "express";
import { filter, map } from "rxjs/operators";

export const courseStateSelector = createFeatureSelector<CourseState>('courses')

export const getAllCourses = createSelector(courseStateSelector,fromCourses.selectAll)
// parameter 1 is a selector which can be a feature selector or a normal selector or it gives the state
// parameter 2 is a callback function which transfors the data returns it called as projection function

export const getIsCoursesLoaded = createSelector(courseStateSelector,(state)=>state.isCoursesAdded)
export const getBeginnerCourses = createSelector(getAllCourses,(courses)=> courses.filter(item=>item.category=="BEGINNER"))
export const getAdvanceCourses = createSelector(getAllCourses,(courses)=> courses.filter(item=>item.category=="ADVANCED"))