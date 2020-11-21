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
    required: true,
    unique: true
  },
  orgs: [{
    login: String,
    id: Number
  }]
});

async function getOrganizations(username) {
  const config = {
    headers: { Authorization: `token ${token}` }
  };
  const orgs = await axios.get(`https://api.github.com/users/${username}/orgs`, config);
  return orgs.data.map((org) => ({ login: org.login, id: org.id }));
}

schema.statics.findOrCreate = function findOrCreate(_accessToken, _refreshToken, profile, done) {
  const User = this;

  User.findOne({ githubId: profile.id }, async (error, user) => {
    if (error) return done(error);
    if (user) return done(null, user);

    const newUser = new User({
      githubId: profile.id,
      username: profile.username,
      orgs: await getOrganizations(profile.username)
    });

    newUser.save((saveError) => {
      if (saveError) return done(saveError);
      done(null, newUser.toObject());
    });
  });
};

exports.User = mongoose.model("User", schema);
