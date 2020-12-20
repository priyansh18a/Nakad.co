import Dinero from "dinero.js";
import { DineroObject } from "dinero.js";

export function equals(obj1: DineroObject, obj2: DineroObject): boolean {
  return Dinero(obj1).equalsTo(Dinero(obj2));
}

export function lessThanOrEqual(obj1: DineroObject, obj2: DineroObject): boolean {
  return Dinero(obj1).lessThanOrEqual(Dinero(obj2));
}

export function subtract(obj1: DineroObject, obj2: DineroObject): DineroObject {
  return Dinero(obj1).subtract(Dinero(obj2)).toObject();
}

export function multiply(obj1: DineroObject, multiplier: number): DineroObject {
  return Dinero(obj1).multiply(multiplier).toObject();
}
