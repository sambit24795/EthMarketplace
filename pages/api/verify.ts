import { Session } from "next-iron-session";
import { v4 as uuidV4 } from "uuid";
import { NextApiRequest, NextApiResponse } from "next";
import {
  withSession,
  contractAddress,
  addressCheck,
  pinataApiKey,
  pinataSecretApiKey,
} from "./utils";
import axios from "axios";

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    if (req.method === "GET") {
      try {
        const message = {
          contractAddress,
          id: uuidV4(),
        };
        req.session.set("message-session", message);
        await req.session.save();
        res.json(message);
      } catch (error) {
        res.status(422).send({ message: "cannot generate a messgae " });
      }
    } else if (req.method === "POST") {
      try {
        const { body } = req;
        const item = body.item;
        if (!item.description || !item.price || !item.name) {
          res.status(422).send({ message: "Form data are missing" });
          return;
        }

        await addressCheck(req, res);

        const pinataRes = await axios.post(
          "https://api.pinata.cloud/pinning/pinJSONToIPFS",
          {
            pinataMetadata: {
              name: uuidV4(),
            },
            pinataContent: item,
          },
          {
            headers: {
              pinata_api_key: pinataApiKey,
              pinata_secret_api_key: pinataSecretApiKey,
            },
          }
        );

        return res.status(200).send(pinataRes.data);
      } catch (error) {
        res.status(422).send({ message: "cannot create json" });
      }
    } else {
      res.status(200).json({ message: "invalid api route" });
    }
  }
);
