import { useDispatch, useSelector } from 'react-redux';

import { githubSagas } from '../../../sagas';
import { githubActions, githubSelectors } from '../../../slices';

export const useGithubCard = (id: number) => {
  const dispatch = useDispatch();
  const card = useSelector(githubSelectors.getGithubCard(id));

  const setDragging = (isDragging: boolean) =>
    dispatch(githubSagas.setDragging.action({ id, isDragging }));

  const setOffset = (offset: { x: number; y: number }) =>
    dispatch(githubActions.setSelect({ offset }));

  const positionChange = (position: { x: number; y: number }) =>
    dispatch(githubSagas.positionChange.action({ position }));

  const incrementReaction = (id: number, reaction: string) =>
    dispatch(githubSagas.incrementReaction.action({ id, reaction }));

  return {
    state: { card },
    functions: { setDragging, incrementReaction, positionChange, setOffset }
  };
};
