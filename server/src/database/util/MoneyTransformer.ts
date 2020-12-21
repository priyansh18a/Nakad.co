import Dinero, { DineroObject } from "dinero.js";
import { ValueTransformer } from "typeorm/decorator/options/ValueTransformer";

export class MoneyTransformer implements ValueTransformer {
  to(value: DineroObject): string {
    return Dinero(value).getAmount().toString();
  }

  from(value: string): DineroObject {
    if (value === null) {
      return null;
    }
    return Dinero({ amount: parseInt(value, 10), currency: "INR" }).toObject();
  }
}
