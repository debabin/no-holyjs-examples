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

export interface GithubCardModel {
  description: GithubCard['description'];
  id: GithubCard['id'];
  image: GithubCard['image'];
  incrementReaction: Action;
  isDraggingAtom: Atom<boolean>;
  position: RecordAtom<{ x: number; y: number }>;
  reactions: RecordAtom<Record<string, number>>;
  reactionsCountAtom: Atom<number>;
  size: GithubCard['size'];
  title: GithubCard['title'];
}

export const draggingAtom = atom<GithubCardModel | null>(null, 'draggingAtom');

const reatomCard = (card: GithubCard): GithubCardModel => {
  const name = `card#${card.id}`;

  const position = reatomRecord(card.position, `${name}.position`);
  const reactions = reatomRecord(card.reactions, `${name}.reactions`);

  const reactionsCountAtom = atom((ctx) => {
    return Object.values(ctx.spy(reactions)).reduce((a, b) => a + b);
  }, `${name}.reactionsCount`);

  const model: GithubCardModel = {
    ...card,
    isDraggingAtom: atom((ctx) => model === ctx.spy(draggingAtom), `${name}.isDragging`),
    position,
    reactions,
    reactionsCountAtom,
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
        'reactionsCountAtom',
        'incrementReaction',
        'isDraggingAtom'
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
    loadingAtom: atom((ctx) => ctx.spy(original.pendingAtom) > 0, `${name}.loading`),
    reactionsCountAtom: atom((ctx) => {
      const cards = ctx.spy(original.dataAtom);
      return cards.reduce((a, { reactionsCountAtom }) => a + ctx.spy(reactionsCountAtom), 0);
    }, `${name}.reactionsCount`)
  }))
);
