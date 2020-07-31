const { Style } = require("./style");

function initCollection() {
  if (process.env.NODE_ENV === "test") return;

  async function fillDB() {
    const styles = await Style.find({}).lean();
    if (styles && styles.length !== 0) return styles;

    const newElements = [
      { repository: "https://github.com/StylishThemes/GitHub-Dark" },
      { repository: "https://github.com/StylishThemes/Quora-Dark" },
      { repository: "https://github.com/StylishThemes/StackOverflow-Dark" },
      { repository: "https://github.com/StylishThemes/Discourse-Dark" },
      { repository: "https://github.com/StylishThemes/Wikipedia-Dark" },
      { repository: "https://github.com/VChet/Telegram-Vanilla-Dark-Web" }
    ];
    Style.insertMany(newElements);
  }

  fillDB();
}

module.exports = { initCollection };
