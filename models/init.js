const { Style } = require("./Style");

async function initCollection() {
  if (process.env.NODE_ENV === "test") return;

  const styles = await Style.find({}).lean();
  if (styles && styles.length) return styles;

  const initialStyles = [
    { url: "https://github.com/StylishThemes/GitHub-Dark" },
    { url: "https://github.com/StylishThemes/Quora-Dark" },
    { url: "https://github.com/StylishThemes/StackOverflow-Dark" },
    { url: "https://github.com/StylishThemes/Discourse-Dark" },
    { url: "https://github.com/StylishThemes/Wikipedia-Dark" },
    { url: "https://github.com/VChet/Telegram-Vanilla-Dark-Web" }
  ];
  await Style.insertMany(initialStyles);
  console.log(await Style.updateAllStyles());
}

module.exports = { initCollection };
