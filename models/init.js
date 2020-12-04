const { Style } = require("./Style");

async function initCollection() {
  if (process.env.NODE_ENV === "test") return;

  const styles = await Style.find({}).lean();
  if (styles && styles.length) return styles;

  const initialStyles = [{
    url: "https://github.com/StylishThemes/GitHub-Dark",
    usercss: "https://raw.githubusercontent.com/StylishThemes/GitHub-Dark/master/github-dark.user.css"
  }, {
    url: "https://github.com/StylishThemes/StackOverflow-Dark",
    usercss: "https://raw.githubusercontent.com/StylishThemes/StackOverflow-Dark/master/stackoverflow-dark.user.css"
  }];

  await Style.insertMany(initialStyles);
  console.log(await Style.updateAllStyles());
}

module.exports = { initCollection };
