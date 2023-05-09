import dbConnect from "../../../db/connect";
import Places from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const place = await Places.find();
    return response.status(200).json(place);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
