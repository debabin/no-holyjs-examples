import type { Action, Atom, RecordAtom } from '@reatom/framework';
import {
  action,
  atom,
  concurrent,
  omit,
  parseAtoms,
  reatomAsync,
  reatomRecord,
  sleep,
  withAssign,
  withDataAtom,
  withErrorAtom
} from '@reatom/framework';

import { getGithubCards, putGithubCard } from '@/utils/api';

export type GithubCardModel = {
  id: GithubCard['id'];
  size: GithubCard['size'];
  title: GithubCard['title'];
  description: GithubCard['description'];
  image: GithubCard['image'];
  position: RecordAtom<{ x: number; y: number }>;
  reactions: RecordAtom<Record<string, number>>;
  isDragging: Atom<boolean>;
  reactionsCount: Atom<number>;
  incrementReaction: Action;
};

export const dragging = atom<null | GithubCardModel>(null, 'dragging');

const reatomCard = (card: GithubCard): GithubCardModel => {
  const name = `card#${card.id}`;

  const position = reatomRecord(card.position, `${name}.position`);
  const reactions = reatomRecord(card.reactions, `${name}.reactions`);

  const reactionsCount = atom((ctx) => {
    return Object.values(ctx.spy(reactions)).reduce((a, b) => a + b);
  }, `${name}.reactionsCount`);

  const model: GithubCardModel = {
    ...card,
    isDragging: atom((ctx) => model === ctx.spy(dragging), `${name}.isDragging`),
    position,
    reactions,
    reactionsCount,
    incrementReaction: action((ctx, reaction: string) => {
      reactions.merge(ctx, {
        [reaction]: ctx.get(reactions)[reaction] + 1
      });
    }, `${name}.incrementReaction`)
  };

  const sync = action(
    concurrent(async (ctx) => {
      await ctx.schedule(() => sleep(500));
      const card = omit(parseAtoms(ctx, model), [
        'reactionsCount',
        'incrementReaction',
        'isDragging'
      ]);
      await putGithubCard({
        params: card
      });
    }),
    `${name}.sync`
  );

  for (const target of [position, reactions]) {
    target.onChange(sync);
  }

  return model;
};

export const fetchCards = reatomAsync(async () => {
  const getGithubCardsResponse = await getGithubCards();
  return getGithubCardsResponse.data.githubCards;
}, 'fetchCards').pipe(
  withDataAtom([], (_, cards) => cards.map((card) => reatomCard(card))),
  withErrorAtom(),
  withAssign((original, name) => ({
    loading: atom((ctx) => ctx.spy(original.pendingAtom) > 0, `${name}.loading`),
    reactionsCount: atom((ctx) => {
      const cards = ctx.spy(original.dataAtom);
      return cards.reduce((a, { reactionsCount }) => a + ctx.spy(reactionsCount), 0);
    }, `${name}.reactionsCount`)
  }))
);
