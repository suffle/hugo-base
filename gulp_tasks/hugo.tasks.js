import { spawn } from "child_process";
import hugo from "hugo-bin";

export const buildSite = (src, dest, cb, env = "development") => {
  const hugoArgsGeneral = ["-d", dest, "-s", src, "-v"];
  const hugoArgsDev = ["--buildDrafts", "--buildFuture"];
  const hugoArgsProd = [];
  const args =
    env === "production"
      ? [...hugoArgsGeneral, ...hugoArgsProd]
      : [...hugoArgsGeneral, ...hugoArgsDev];

  process.env.NODE_ENV = env;

  spawn(hugo, args, { stdio: "inherit" }).on("close", code => {
    cb(code);
  });
};
