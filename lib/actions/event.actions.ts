'use server';

import Event from "@/database/event.model";
import connectDB from "../mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
    try {
        await connectDB();

        const event = await Event.findOne({ slug }).lean();

        // Return similar events
        return await Event.find(
            {
                _id: {$ne: event._id},
                tags: { $in: event.tags },
            }
        )
        .select('title image slug location date time -_id')
        .lean();
    } catch {
        return [];
    }
};
