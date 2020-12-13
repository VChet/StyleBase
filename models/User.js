const mongoose = require("mongoose");
const axios = require("axios");

const { Schema } = mongoose;

const { token } = require("../config").github;

const schema = new Schema({
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
    type: String,
    unique: true
  },
  codebergId: {
    type: String,
    unique: true
  },
  orgs: {
    type: [{
      login: String,
      id: Number
    }],
    default: []
  }
});

async function getOrganizations(api, username) {
  const config = {
    headers: { Authorization: `token ${token}` }
  };
  const orgs = await axios.get(`${api}/users/${username}/orgs`, config);
  return orgs.data.map((org) => ({ login: org.login, id: org.id }));
}

schema.statics.findOrCreate = function findOrCreate(_accessToken, _refreshToken, profile, done) {
  const User = this;

  const { provider, id, username } = profile;
  const userId = {};
  let api;
  switch (provider) {
    case "github":
      userId.githubId = id;
      api = "https://api.github.com";
      break;
    case "gitea":
      userId.codebergId = id;
      api = "https://codeberg.org/api/v1";
      break;
    default:
      userId.githubId = id;
      api = "https://api.github.com";
      break;
  }

  User.findOne(userId, async (error, user) => {
    if (error) return done(error);
    if (user) return done(null, user);

    const newUser = new User({
      ...userId,
      username,
      orgs: await getOrganizations(api, username)
    });

    newUser.save((saveError) => {
      if (saveError) return done(saveError);
      done(null, newUser.toObject());
    });
  });
};

exports.User = mongoose.model("User", schema);
