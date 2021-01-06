import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { customAlphabet } from "nanoid";

import type { Document, PaginateModel } from "mongoose";
import type { BulkWriteResult, UnorderedBulkOperation } from "mongodb";

import { retrieveRepositoryData } from "../api/parser";

export interface IStyle extends Document {
  url: string
  usercss: string
  preview?: string
  name: string
  description?: string
  owner: {
    id: number
    login: string
  }
  created: string
  lastUpdate: string
  topics: Array<string>
  stargazers: number
  watchers: number
  forks: number
  issues: number
  license?: string
  isPrivate: boolean
  isArchived: boolean
  isFork: boolean
  styleId: string
  customName?: string
  customDescription?: string
  customPreview?: string
}

export interface IStyleModel extends PaginateModel<IStyle> {
  updateAllStyles: () => Promise<BulkWriteResult>;
}

const styleIdAlphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const StyleSchema: Schema = new Schema({
  url: {
    type: String,
    required: true
  },
  usercss: {
    type: String,
    unique: true
  },
  preview: String,
  name: String,
  description: String,
  owner: {
    type: {
      id: Number,
      login: String
    }
  },
  created: String,
  lastUpdate: String,
  topics: Array,
  stargazers: Number,
  watchers: Number,
  forks: Number,
  issues: Number,
  license: String,
  isPrivate: Boolean,
  isArchived: Boolean,
  isFork: Boolean,
  styleId: {
    type: String,
    default: () => customAlphabet(styleIdAlphabet, 11)()
  },
  customName: String,
  customDescription: String,
  customPreview: String
});

StyleSchema.index({
  name: "text",
  customName: "text",
  "owner.login": "text",
  topics: "text"
});
StyleSchema.plugin(mongoosePaginate);

StyleSchema.statics.updateAllStyles = async function (): Promise<BulkWriteResult> {
  const Style: any = this;
  const styles: Array<IStyle> = await Style.find({}).lean();
  const stylesData = await Promise.allSettled(
    styles.map(({ url, usercss }) => retrieveRepositoryData(url, { download_url: usercss }))
  );

  const Bulk: UnorderedBulkOperation = Style.collection.initializeUnorderedBulkOp();
  stylesData.forEach((promise) => {
    if (promise.status === "fulfilled") {
      const styleData = promise.value;
      Bulk.find({ usercss: styleData.usercss }).update({ $set: styleData });
    } else {
      console.log(promise.reason.message);
    }
  });
  return Bulk.execute();
};

export const Style = model<IStyle, IStyleModel>("Style", StyleSchema);
