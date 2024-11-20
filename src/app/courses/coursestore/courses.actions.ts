import { createAction, props } from "@ngrx/store";
import { Course } from "../model/course";
import { Update } from "@ngrx/entity";

export const loadCourseList= createAction(
    "[Course Resolver] Load Course List"
)

export const courseListLoaded= createAction(
    "[Load Course List Effect] Course List Loaded",
    props<{courses:Course[]}>()
)

export const courseEdited= createAction(
    "[Edit Course Dialog] Course Edited",
    props<{updatedCourse:Update<Course>}>()
)
// update is special type of object which is used to update the values in the store