const { Feed } = require("feed");

const { Style } = require("../models/Style");

async function getRss(req, res) {
  const feed = new Feed({
    title: "StyleBase",
    description: "Website styles from various authors",
    id: "https://stylebase.cc",
    link: "https://stylebase.cc",
    favicon: "https://stylebase.cc/favicon.ico",
    author: {
      name: "StyleBase",
      link: "https://stylebase.cc",
      email: "feedback@stylebase.cc"
    }
  });

  const styles = await Style.find({}).lean();
  styles.forEach(style => {
    let content = [];
    content.push(`${style.customName || style.name} by ${style.owner}.`);
    content.push(`<a href='${style.usercss}'>Install UserCSS</a>`);
    content.push(`<a href='${style.url}'>Repository</a>`);
    content = content.join("<br />");

    feed.addItem({
      title: style.customName || style.name,
      id: style._id,
      link: `https://stylebase.cc/${style.owner}/${style.name}`,
      description: style.description,
      content,
      author: [{ name: style.owner }],
      date: style._id.getTimestamp(),
      image: style.customPreview || style.preview
    });
  });

  res.type("application/xml").send(feed.rss2());
}

module.exports = {
  getRss
};
