import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(place);
  }

  if (request.method === "PATCH") {
    const placeToUpdate = await Place.findByIdAndUpdate(id, {
      $set: request.body,
    });

    response.status(200).json(placeToUpdate);
    // If successful, you'll receive an OK status code.
  }
  //this is a random comment

  if (request.method === "DELETE") {
    const placeToDelete = await Place.findByIdAndDelete(id);
    // Declare jokeToDelete to be the joke identified by its id and delete it.
    // This line handles the entire deletion process.
    response.status(200).json(placeToDelete);
  }
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const placeData = Object.fromEntries(formData);

    const response = await fetch("/api/places", {
      method: "POST",
      body: JSON.stringify(placeData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await response.json();

      Place.mutate();

      event.target.reset();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }
}
