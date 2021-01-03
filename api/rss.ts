import { Feed } from "feed";

import type { Request, Response } from "express";
import type { IStyle } from "../models/Style";

import { Style } from "../models/Style";

export default async function getRss(_req: Request, res: Response) {
  const siteUrl = "https://stylebase.cc";
  const feed = new Feed({
    title: "StyleBase",
    description: "Website styles from various authors",
    id: siteUrl,
    link: siteUrl,
    favicon: `${siteUrl}/favicon.ico`,
    author: {
      name: "StyleBase",
      link: siteUrl,
      email: "feedback@stylebase.cc"
    },
    copyright: "All styles belong to their first authors"
  });

  const styles = await Style.find({}).lean();
  styles.forEach((style: IStyle) => {
    const content: Array<string> = [];
    content.push(`${style.customName || style.name} by ${style.owner.login}.`);
    content.push(`<a href='${style.usercss}'>Install UserCSS</a>`);
    content.push(`<a href='${style.url}'>Repository</a>`);

    feed.addItem({
      title: style.customName || style.name,
      id: style._id,
      link: `${siteUrl}/${style.owner.login}/${style.name}`,
      description: style.customDescription || style.description,
      content: content.join("<br />"),
      author: [{ name: style.owner.login }],
      date: style._id.getTimestamp(),
      image: style.customPreview || style.preview
    });
  });

  res.type("application/xml").send(feed.rss2());
}
