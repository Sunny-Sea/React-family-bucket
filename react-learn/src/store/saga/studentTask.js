import { cps, put, select, takeEvery } from "redux-saga/effects";

import { searchStudents } from "../../services/fetchStudent";
import { fetchStudent, setIsLoading, setStudentAndTotal } from "../action/student/searchResult";

const mockData = (condition, callback) => {
    console.log("condition:", condition);
    setTimeout(() => {
        if (Math.random() > 0.5) {
            callback(null, {
                cont: 10,
                datas: [
                    {
                        id: 1,
                        name: "abc",
                    },
                    {
                        id: 2,
                        name: "bac",
                    },
                ],
            });
        } else {
            callback(new Error("数据获取错误！", null));
        }
    }, 2000);
};

function* fetchStudents() {
    // 设置为正在加载中
    yield put(setIsLoading(true));
    const condition = yield select(state => state.studentReducer.conditionReducer);
    // 根据call指令，获取当前仓库的条件
    try {
        const resp = yield cps(mockData, condition);
        console.log(resp);
        yield put(setStudentAndTotal(resp.datas, resp.cont));
    } catch (err) {
        console.log(err.message);
    } finally {
        yield put(setIsLoading(false));
    }
}

function* fetchStudentFn() {
    yield takeEvery(fetchStudent, fetchStudents);
    console.log("正在监听fetchStudent");
}

export default fetchStudentFn;
