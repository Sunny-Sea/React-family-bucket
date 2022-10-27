import { cancel, delay, fork, put, take, takeEvery } from "redux-saga/effects";

import { asyncDecrease, asyncIncrease, decreaseFn, increaseFn } from "../action/counter";

function* asyncIncreaseFn() {
    let task;
    while (true) {
        yield take(asyncIncrease);
        if (task) {
            // 说明之前有任务,先把之前的任务取消，再开启新的任务
            yield cancel(task);
            console.log("之前的任务被取消了！");
        }
        task = yield fork(function* () {
            yield delay(2000);
            yield put(increaseFn());
        });
    }
}

function* asyncDecreaseFn() {
    yield delay(2000);
    yield put(decreaseFn());
}

function* conuterTask() {
    yield fork(asyncIncreaseFn);
    yield takeEvery(asyncDecrease, asyncDecreaseFn);
    console.log("正在监听asyncIncreaseFn,asyncDecreaseFn");
}

export default conuterTask;