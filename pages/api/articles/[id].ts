import {articles} from "../../../data";
import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {id} = req.query;
  const filtered = articles.filter(article => article.id === id);
  if(filtered.length > 0) {
    return res.status(200).json(filtered[0]);
  } else {
    return res.status(404).json({Message: `Article with id ${id} is not found`});
  }
}