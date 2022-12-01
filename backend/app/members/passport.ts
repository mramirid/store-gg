import type { JwtPayload } from "jsonwebtoken";
import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { env } from "../../lib/constant";
import { name as packageName } from "../../package.json";
import { toError } from "../../utils/error";
import Member, { MemberDoc } from "./model";

const memberPassport = new passport.Passport();

memberPassport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.BACKEND_SECRET,
      issuer: packageName,
    },
    async (jwt_payload: JwtPayload, done) => {
      try {
        const member = await Member.findOne({ email: jwt_payload.sub });
        done(undefined, member ?? undefined);
      } catch (error) {
        done(toError(error));
        return;
      }
    }
  )
);

memberPassport.serializeUser<string>((member, done) => {
  process.nextTick(() => {
    done(undefined, (member as MemberDoc).id);
  });
});

memberPassport.deserializeUser((memberId: string, done) => {
  process.nextTick(async () => {
    try {
      const member = await Member.findById(memberId);
      done(undefined, member);
    } catch (error) {
      done(toError(error));
    }
  });
});

export default memberPassport;
