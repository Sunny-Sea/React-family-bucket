import store from ".";
import { getStudentData } from "./action/searchResult";

store.dispatch(getStudentData(store.getState().student.condition));
