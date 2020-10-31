import Dinero from "dinero.js";
import { ValueTransformer } from "typeorm/decorator/options/ValueTransformer";

export class MoneyTransformer implements ValueTransformer {
  to(value: Dinero.Dinero): string {
    return value.getAmount().toString();
  }

  from(value: string): Dinero.Dinero {
    return Dinero({ amount: parseInt(value, 10), currency: "INR" });
  }
}
