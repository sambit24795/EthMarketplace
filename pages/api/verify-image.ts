import {
  addressCheck,
  pinataApiKey,
  pinataSecretApiKey,
  withSession,
} from "./utils";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import { v4 as uuidV4 } from "uuid";
import FormData from "form-data";
import axios from "axios";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    if (req.method === "POST") {
      const { bytes, fileName, contentType } = req.body;

      if (!bytes || !fileName || !contentType) {
        return res.status(422).send({ message: "Image data are missing" });
      }

      await addressCheck(req, res);
      const buffer = Buffer.from(Object.values(bytes as Uint8Array));
      const formData = new FormData();
      formData.append("file", buffer as ArrayBuffer, {
        contentType,
        filename: (fileName as string) + "_" + uuidV4(),
      });

      const fileRes = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: Infinity,
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData.getBoundary()}`,
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
          },
        }
      );

      return res.status(200).send(fileRes.data);
    } else {
      return res.status(422).send({ message: "Invalid api route" });
    }
  }
);
