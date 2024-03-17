import { useSelector } from 'react-redux';

import { useDispatch } from '@/apps/redux-saga-variant/redux/hooks';

import { githubActions, githubSelectors } from '../../../slices';
import { githubThunks } from '../../../thunks';

export const useGithubCard = (id: number) => {
  const dispatch = useDispatch();
  const card = useSelector(githubSelectors.getGithubCard(id));

  const setDragging = (isDragging: boolean) =>
    dispatch(githubThunks.setDragging.thunk({ id, isDragging }));

  const setOffset = (offset: { x: number; y: number }) =>
    dispatch(githubActions.setSelect({ offset }));

  const positionChange = (position: { x: number; y: number }) =>
    dispatch(githubThunks.positionChange.thunk({ position }));

  const incrementReaction = (id: number, reaction: string) =>
    dispatch(githubThunks.incrementReaction.thunk({ id, reaction }));

  return {
    state: { card },
    functions: { setDragging, incrementReaction, positionChange, setOffset }
  };
};
