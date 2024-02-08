import { genericQueryBuilder, genericQueryMutation } from './middleware/genericBuilder';
// eslint-disable-next-line import/no-cycle
import { mainEndPointCreator } from './middleware/mainEndPointCreator';

export default function allReducers(builders) {
  return {
    getPokemonByName: genericQueryBuilder(builders),
    getPokemonByID: genericQueryBuilder(builders),
    getDashboardData: genericQueryBuilder(builders),
    submitFeedback: genericQueryMutation(builders)
  };
}

export const {
  useGetPokemonByNameQuery,
  useGetPokemonByIDQuery,
  useSubmitFeedbackMutation,
  useLazyGetPokemonByNameQuery
} = mainEndPointCreator;
