import { Request, Response } from "express";
import { Feed } from "feed";

import { IStyle, Style } from "../models/Style";

export async function getRss(_req: Request, res: Response) {
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
    },
    copyright: "All styles belong to their first authors"
  });

  const styles = await Style.find({}).lean();
  styles.forEach((style: IStyle) => {
    let content: Array<string> = [];
    content.push(`${style.customName || style.name} by ${style.owner.login}.`);
    content.push(`<a href='${style.usercss}'>Install UserCSS</a>`);
    content.push(`<a href='${style.url}'>Repository</a>`);

    feed.addItem({
      title: style.customName || style.name,
      id: style._id,
      link: `https://stylebase.cc/${style.owner.login}/${style.name}`,
      description: style.customDescription || style.description,
      content: content.join("<br />"),
      author: [{ name: style.owner.login }],
      date: style._id.getTimestamp(),
      image: style.customPreview || style.preview
    });
  });

  res.type("application/xml").send(feed.rss2());
}
