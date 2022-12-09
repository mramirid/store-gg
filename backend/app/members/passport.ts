import type { JwtPayload } from "jsonwebtoken";
import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { env } from "../../lib/constant";
import Member, { TMember, MemberDoc } from "./model";

const memberPassport = new passport.Passport();

type MemberJWTPayload = JwtPayload &
  Pick<TMember, "fullName" | "email" | "phoneNumber">;

memberPassport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.BACKEND_SECRET,
    },
    async (jwtPayload: MemberJWTPayload, done) => {
      try {
        const member = await Member.findOne({ email: jwtPayload.email });
        done(undefined, member ?? undefined);
      } catch (error) {
        done(error);
      }
    }
  )
);

memberPassport.serializeUser<string>((member, done) => {
  process.nextTick(() => {
    done(undefined, (member as MemberDoc).id);
  });
});

memberPassport.deserializeUser<string>((memberId, done) => {
  process.nextTick(async () => {
    try {
      const member = await Member.findById(memberId);
      done(undefined, member);
    } catch (error) {
      done(error);
    }
  });
});

export default memberPassport;
