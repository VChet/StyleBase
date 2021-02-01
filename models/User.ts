import { Schema, model } from "mongoose";
import axios from "axios";

import type { Document, Model, CallbackError } from "mongoose";
import type { Profile } from "passport";
import type { Provider, ProviderName } from "../types/server";
import type { CodebergOrganization, GitHubOrganization } from "../types/api";

import providers from "../api/providers";

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
  findOrCreate: (
    provider: ProviderName,
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: Function
  ) => any;
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

async function getOrganizations(provider: Provider, username: string): Promise<Array<Organization>> {
  const response = await axios.get(`${provider.api}/users/${username}/orgs`, provider.options);
  return response.data.map((org: GitHubOrganization & CodebergOrganization) => {
    if (provider.name === "GitHub") {
      return { login: org.login, id: org.id };
    }
    return { login: org.username, id: org.id };
  });
}

UserSchema.statics.findOrCreate = function (
  providerName: ProviderName,
  _accessToken: string,
  _refreshToken: string,
  profile: Profile,
  done: Function
) {
  const User: any = this;

  const { id, username } = profile;
  if (!username) return done(new Error("Missing username"));

  const provider = providers.find((pr) => pr.name === providerName);
  if (!provider) return done(new Error(`Unsupported provider: ${providerName}`));

  const userId: Pick<IUser, "githubId" | "codebergId"> = {};
  userId[provider.idField] = parseInt(id, 10);

  User.findOne(userId, async (error: CallbackError, user: IUser) => {
    if (error) return done(error);
    if (user) return done(null, user);

    const newUser: IUser = new User({
      ...userId,
      username,
      orgs: await getOrganizations(provider, username)
    });

    newUser.save((saveError) => {
      if (saveError) return done(saveError);
      done(null, newUser.toObject());
    });
  });
};

export const User = model<IUser, IUserModel>("User", UserSchema);
