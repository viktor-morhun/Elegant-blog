import { all, fork, Effect } from 'redux-saga/effects';
import postsSaga from './postsSaga';

export default function* rootSaga(): Generator<Effect, void, unknown> {
  yield all([
    fork(postsSaga),
  ]);
}
