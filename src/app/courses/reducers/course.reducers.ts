import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Course } from "../model/course";
import { CourseActions } from "../coursestore/action-types";
import { createReducer, on } from "@ngrx/store";


export interface CourseState  extends EntityState<Course> {
    isCoursesAdded:boolean
}

export const adapter = createEntityAdapter<Course>({
    sortComparer:(a,b)=>{

        const compare = a.seqNo - b.seqNo;

        if (compare > 0) {
          return 1;
        }
        else if ( compare < 0) {
          return -1;
        }
        else return 0;
    }
});
export const initialCourseState = adapter.getInitialState();


export const courseReducer = createReducer(
    initialCourseState,
//     on(CourseActions.courseListLoaded, (state, action) => adapter.setAll(action.courses, 
//         {
//         ...state,
//         isCoursesAdded:true
//     }),
//     on(CourseActions.courseEdited,
//         (state,action)=>adapter.updateOne(action.updatedCourse,state))
    
// )
on(CourseActions.courseListLoaded, (state, action) => {
    return adapter.setAll(action.courses, {
      ...state,
      isCoursesAdded: true
    });
  }),
  on(CourseActions.courseEdited, (state, action) => {
    return adapter.updateOne(action.updatedCourse, state);
  })
)

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();