const { Style } = require("./Style");

function initCollection() {
  if (process.env.NODE_ENV === "test") return;

  async function fillDB() {
    const styles = await Style.find({}).lean();
    if (styles && styles.length !== 0) return styles;

    const newElements = [
      { url: "https://github.com/StylishThemes/GitHub-Dark" },
      { url: "https://github.com/StylishThemes/Quora-Dark" },
      { url: "https://github.com/StylishThemes/StackOverflow-Dark" },
      { url: "https://github.com/StylishThemes/Discourse-Dark" },
      { url: "https://github.com/StylishThemes/Wikipedia-Dark" },
      { url: "https://github.com/VChet/Telegram-Vanilla-Dark-Web" }
    ];
    Style.insertMany(newElements);
  }

  fillDB();
}

module.exports = { initCollection };
