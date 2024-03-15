import { z } from "zod";

export const EditListingSchema = z.object({
  totalRooms: z.number().min(1),
  maxGuestsPerRoom: z.number().min(1),
  bedsPerRoom: z.number().min(1),
  bathroomPerRoom: z.number().min(1),
  amenities: z.array(z.string()),
  aboutHotel: z.string().min(20),
  listingTitle: z.string().min(10).max(60),
  roomType: z.string().min(3),
  rentPerNight: z.number().min(1000),
});
