import type { Request, Response } from "express";
import type { CallbackError, FilterQuery, PaginateOptions } from "mongoose";
import type { AxiosError } from "axios";
import type { IStyle } from "../models/Style";

import { Style } from "../models/Style";
import { retrieveRepositoryFiles, retrieveRepositoryData } from "./parser";

function handleParserError(res: Response, error: AxiosError & CallbackError) {
  if (error.response) {
    return res.status(error.response.status).json({ error: error.response.statusText });
  }
  if (error.message) {
    return res.status(400).json({ error: error.message });
  }
  console.log(error);
  res.status(500).json({ error: "Unhandled server error" });
}

function checkPreviewUrl(url: string) {
  const previewUrl = new URL(url);
  const imagePattern = /\.(png|gif|jpg|svg|bmp)$/i;
  if (!previewUrl.protocol.includes("https:")) throw new Error("Preview must be from a secure source");
  if (!imagePattern.test(previewUrl.pathname)) throw new Error("Preview file must be an image");
}

function escapeRegex(text: string) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export function getRepositoryFiles(req: Request, res: Response) {
  if (!req.query.url || typeof req.query.url !== "string") throw new Error("Invalid repository URL");
  const url = req.query.url.replace(/\/$/, ""); // Trim trailing slash

  retrieveRepositoryFiles(url)
    .then((files) => {
      if (!files.length) return res.status(400).json({ error: "Repository does not contain UserCSS files" });
      res.status(200).json({ files });
    })
    .catch((error) => {
      handleParserError(res, error);
    });
}

export function getStyles(req: Request, res: Response) {
  const { query, page = "1", limit = "16", sort } = req.query as { [key: string]: string };
  const { owner } = req.params;

  let filter: FilterQuery<IStyle> = {};
  if (query) {
    const queryRegExp = new RegExp(escapeRegex(query), "gi");
    filter = {
      $or: [
        { name: queryRegExp },
        { customName: queryRegExp },
        { "owner.login": queryRegExp },
        { topics: queryRegExp }
      ]
    };
  }
  if (owner) filter["owner.login"] = owner;

  let sortOrder: { [key: string]: 1 | -1 } = { _id: -1 };
  if (sort === "stargazers") {
    sortOrder = { stargazers: -1, _id: -1 };
  } else if (sort === "lastUpdate") {
    sortOrder = { lastUpdate: -1, _id: -1 };
  }

  const options: PaginateOptions = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sort: sortOrder,
    customLabels: { totalDocs: "totalStyles", docs: "styles" },
    lean: true,
    collation: { locale: "en" }
  };

  Style.paginate(filter, options, (error, data) => {
    if (error) return res.status(500).json({ error });
    return res.status(200).json(data);
  });
}

export function getStyleData(req: Request, res: Response) {
  const { styleId } = req.query;
  if (!styleId) return res.status(400).json({ error: "Request must contain styleId field" });
  if (typeof styleId !== "string") return res.status(400).json({ error: "Invalid styleId" });
  Style.findOne({ styleId }).lean().exec((error: CallbackError, style) => {
    if (error) return res.status(500).json({ error });
    if (!style) return res.status(404).json({ error: "Style not found" });
    return res.status(200).json({ style });
  });
}

export function addStyle(req: Request, res: Response) {
  const { usercss, customName, customDescription, customPreview } = req.body;
  const url = req.body.url.replace(/\/$/, ""); // Trim trailing slash

  Style.findOne({ usercss: usercss.download_url }).lean().exec(async (mongoError: CallbackError, style) => {
    if (mongoError) return res.status(500).json({ error: mongoError });
    if (style) return res.status(409).json({ error: "Style was already added to our base" });

    if (customPreview) {
      try {
        checkPreviewUrl(customPreview);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    }

    retrieveRepositoryData(url, usercss)
      .then((data) => {
        const newStyle = new Style({
          ...data,
          customName,
          customDescription,
          customPreview
        });
        newStyle.save((saveError) => {
          if (saveError) return res.status(500).json({ error: `${saveError.name}: ${saveError.message}` });
          res.status(201).json({ style: newStyle });
        });
      })
      .catch((error) => {
        handleParserError(res, error);
      });
  });
}

export function updateStyle(req: Request, res: Response) {
  const { _id } = req.body;
  if (!_id) return res.status(400).json({ error: "Request must contain _id field" });

  Style.findById(_id).lean().exec(async (mongoError: CallbackError, style) => {
    if (mongoError) return res.status(500).json({ error: mongoError });
    if (!style) return res.status(404).json({ error: "Style was not found in our base" });

    retrieveRepositoryData(style.url, { download_url: style.usercss })
      .then((data) => {
        Style.findByIdAndUpdate(_id, data, { new: true }, (updateError: CallbackError, result) => {
          if (updateError) return res.status(500).json({ error: updateError });
          return res.status(200).json({ result });
        });
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
  });
}

export function updateAllStyles(_req: Request, res: Response) {
  Style.updateAllStyles()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      handleParserError(res, error);
    });
}

export function editStyle(req: Request, res: Response) {
  const {
    _id, customName, customDescription, customPreview
  } = req.body;

  if (customPreview) {
    try {
      checkPreviewUrl(customPreview);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  Style.findByIdAndUpdate(
    _id,
    { $set: { customName, customDescription, customPreview } },
    { new: true },
    (error, style) => {
      if (error) return res.status(500).json({ error });
      return res.status(200).json({ style });
    }
  );
}

export async function deleteStyle(req: Request, res: Response) {
  Style.findByIdAndDelete(req.body._id, null, (error, style) => {
    if (error) return res.status(500).json({ error });
    return res.status(200).json({ style });
  });
}

export function getAllTopics(_req: Request, res: Response) {
  const pipeline = [
    { $unwind: "$topics" },
    { $group: { _id: "$topics", count: { $sum: 1 } } },
    { $match: {
      $and: [
        { count: { $gte: 3 } },
        { _id: { $nin: ["css", "awesome", "stylish", "stylus", /theme/, /usercss/, /userstyle/] } }
      ]
    } },
    { $project: { _id: 0, name: "$_id", count: 1 } }
  ];
  Style.aggregate(pipeline).exec((error, topics: Array<{ name: string, count: number }>) => {
    if (error) return res.status(500).json({ error });
    return res.status(200).json({ topics });
  });
}
