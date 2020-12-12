import { getConnection } from "typeorm";
import { User } from "../database/entity/User";
import passport from "passport";
import { validPassword } from "../database/util/passwordUtils";
import { Strategy as LocalStrategy } from "passport-local";

export function initializePassportConfig() {
  const verifyCallback = (username, password, done) => {
    getConnection()
      .getRepository(User)
      .findOne({
        where: {
          username,
        },
      })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        const isValid = validPassword(password, user.hash, user.salt);
        if (isValid) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password." });
        }
      })
      .catch((err) => {
        done(err);
      });
  };

  const strategy = new LocalStrategy(verifyCallback);

  passport.use(strategy);
  passport.serializeUser((user, done) => {
    const userSerialize = user as User;
    done(null, userSerialize.username);
  });

  passport.deserializeUser(async (username, done) => {
    const u = await getConnection().getRepository(User).findOne({
      where: {
        username,
      },
    });
    done(null, u);
  });
}
