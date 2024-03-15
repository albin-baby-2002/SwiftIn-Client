import { z } from "zod";

export const EditListingImageSchema = z.object({
  mainImage: z.string().refine((value) => {
    return value;
  }, "Main Img Is Compulsory"),

  otherImages: z.array(z.string()).refine((values) => {
    let pics = values.filter((val) => val.trim());

    return pics.length >= 4;
  }, "Needed Four Other Images"),
});