import { emptySplitApi } from './mainReducer';
// eslint-disable-next-line import/no-cycle
import allReducer from '../allReducer';

export const mainEndPointCreator = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    ...allReducer(builder)
  }),
  overrideExisting: false
});

export default mainEndPointCreator;
