import { Actor } from "../database/entity/Actor";

export interface FrontendActor {
  id: number;
  name: string;
}

export function toFrontendActor(actor: Actor) {
  return { id: actor.actorid, name: actor.actorInfo.name } as FrontendActor;
}
