import { Schema, model } from "mongoose";
import axios, { AxiosResponse } from "axios";

import type { Document, Model, CallbackError } from "mongoose";
import type { Profile } from "passport";

import config from "../config";

type Role = "User" | "Admin";

export interface Organization {
  id: number;
  login: string;
}

export interface IUser extends Document {
  username: string;
  role: Role;
  githubId?: number;
  codebergId?: number;
  orgs: Array<Organization>;
}

export interface IUserModel extends Model<IUser> {
  findOrCreate: (_accessToken: string, _refreshToken: string, profile: Profile, done: Function) => any;
}

export const UserSchema: Schema = new Schema({
  username: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User"
  },
  githubId: {
    type: Number,
    unique: true
  },
  codebergId: {
    type: Number,
    unique: true
  },
  orgs: {
    type: {
      id: Number,
      login: String
    },
    default: []
  }
});

async function getOrganizations(api: string, username: string): Promise<Array<Organization>> {
  const options = {
    headers: { Authorization: `token ${config.github.token}` }
  };
  const orgs: AxiosResponse<Array<Organization>> = await axios.get(`${api}/users/${username}/orgs`, options);
  return orgs.data.map((org) => ({ login: org.login, id: org.id }));
}

UserSchema.statics.findOrCreate = function (
  _accessToken: string,
  _refreshToken: string,
  profile: Profile,
  done: Function
) {
  const User: any = this;

  const { provider, id, displayName } = profile;
  const userId: Pick<IUser, "githubId" | "codebergId"> = {};
  let api: string;

  if (provider === "github") {
    userId.githubId = parseInt(id, 10);
    api = "https://api.github.com";
  } else if (provider === "codeberg") {
    userId.codebergId = parseInt(id, 10);
    api = "https://codeberg.org/api/v1";
  } else {
    console.log("Unsupported provider", provider);
  }

  User.findOne(userId, async (error: CallbackError, user: IUser) => {
    if (error) return done(error);
    if (user) return done(null, user);

    const newUser: IUser = new User({
      ...userId,
      username: displayName,
      orgs: await getOrganizations(api, displayName)
    });

    newUser.save((saveError) => {
      if (saveError) return done(saveError);
      done(null, newUser.toObject());
    });
  });
};

export const User = model<IUser, IUserModel>("User", UserSchema);
