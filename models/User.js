const mongoose = require("mongoose");

const { Schema } = mongoose;

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
  }
});

schema.statics.findOrCreate = function findOrCreate(accessToken, refreshToken, profile, done) {
  const User = this;

  User.findOne({ githubId: profile.id }, async (error, user) => {
    if (error) return done(error);
    if (user) return done(null, user);

    const newUser = new User({
      githubId: profile.id,
      username: profile.username
    });

    newUser.save((saveError) => {
      if (saveError) return done(saveError);
      done(null, newUser.toObject());
    });
  });
};

exports.User = mongoose.model("User", schema);
