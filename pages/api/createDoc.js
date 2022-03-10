import { createDocument } from '../../firebase/createDocument';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(200).json({ status: 'error', message: 'Method not supported!' });
    response.end();
    return;
  }

  const data = req.body;
  // no data
  if (!data.author || !data.rating || !data.collection) {
    res.status(200).json({ status: 'error', message: 'No data was provided!' });
    response.end();
    return;
  }

  // not valid data
  if (data.author.trim().length === 0) {
    res.status(200).json({ status: 'error', message: 'User cannot be empty!' });
    response.end();
    return;
  }

  // Make request to server
  const docObj = { ...data };
  delete docObj.collection;

  createDocument(data.collection, docObj).catch((error) => {
    res.status(200).json({ status: 'error', message: 'Could not add review' });
    response.end();
    return;
  });

  res.status(200).json({ status: 'success', message: 'Review created!' });
}
