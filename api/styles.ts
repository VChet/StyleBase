import type { Request, Response } from "express";
import type { NativeError, PaginateOptions } from "mongoose";
import type { AxiosError } from "axios";
import type { IStyle } from "../models/Style";

import { Style } from "../models/Style";
import { retrieveRepositoryFiles, retrieveRepositoryData } from "./parser";

function handleParserError(res: Response, error: AxiosError & NativeError) {
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
  const { query, page = 1, sort } = req.query;
  const { owner } = req.params;

  const filter: { "owner.login"?: string, $text?: { $search: string } } = {};
  if (owner) filter["owner.login"] = owner;
  if (query && typeof query === "string") filter.$text = { $search: query };

  let sortOrder = "-_id";
  if (sort === "stargazers") {
    sortOrder = "-stargazers";
  } else if (sort === "lastUpdate") {
    sortOrder = "-lastUpdate";
  }

  const options: PaginateOptions = {
    page: page as number,
    customLabels: { totalDocs: "totalStyles", docs: "styles" },
    sort: sortOrder,
    limit: 16,
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
  Style.findOne({ styleId }).lean().exec((error: NativeError, style: IStyle | null) => {
    if (error) return res.status(500).json({ error });
    if (!style) return res.status(404).json({ error: "Style not found" });
    return res.status(200).json({ style });
  });
}

export function addStyle(req: Request, res: Response) {
  const { usercss, customName, customDescription, customPreview } = req.body;
  const url = req.body.url.replace(/\/$/, ""); // Trim trailing slash

  Style
    .findOne({ usercss: usercss.download_url })
    .lean()
    .exec(async (mongoError: NativeError, style: IStyle | null) => {
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

  Style.findById(_id).lean().exec(async (mongoError: NativeError, style: IStyle | null) => {
    if (mongoError) return res.status(500).json({ error: mongoError });
    if (!style) return res.status(404).json({ error: "Style was not found in our base" });

    retrieveRepositoryData(style.url, { download_url: style.usercss })
      .then((data) => {
        Style.findByIdAndUpdate(_id, data, { new: true }, (updateError: NativeError, result) => {
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
