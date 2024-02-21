"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Image from "../database/models/image.model";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

const populateUser = (query: any) =>
  query.populate({
    path: "author",
    model: User,
    select: "_id firstName lastName",
  });

// ADD IMAGE TO DB
export async function addImage({ image, userId, path }: AddImageParams) {
  try {
    await connectToDatabase();

    const author = await User.findById(userId);
    // revalidate the path to update the cache with the new image added
    // means to show the new image in the UI
    if (!author) throw new Error("User not found");
    const newImage = await Image.create({
      ...image,
      author: author._id,
    });
    revalidatePath(path);
    return JSON.parse(JSON.stringify(newImage));
  } catch (error) {
    handleError(error);
  }
}

// Update Image
export async function updateImage({ image, userId, path }: UpdateImageParams) {
  try {
    await connectToDatabase();

    const isImage = await Image.findById(image._id);
    if (!isImage || isImage.author.toHexStriing() !== userId)
      throw new Error("Unauthorized or Image not found");
    const newImage = await Image.findByIdAndUpdate(isImage._id, image, {
      new: true,
    });

    revalidatePath(path);
    return JSON.parse(JSON.stringify(newImage));
  } catch (error) {
    handleError(error);
  }
}

// Delete Image
export async function deleteImage(imageId: string) {
  try {
    await connectToDatabase();

    await Image.findByIdAndDelete(imageId);
  } catch (error) {
    handleError(error);
  } finally {
    redirect("/");
  }
}

// Get Image

export async function getImageById(imageId: string) {
  try {
    await connectToDatabase();
    const getImage = await populateUser(Image.findById(imageId));

    if (!getImage) throw new Error("Image not found");

    return JSON.parse(JSON.stringify(getImage));
  } catch (error) {
    handleError(error);
  }
}
