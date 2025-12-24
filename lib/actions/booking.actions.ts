'use server';

import connectDB from "@/lib/mongodb";
import Booking from "@/database/booking.model";


interface CreateBookingProps {
    eventId: string;
    slug: string;
    email: string;
}

export const createBooking = async ({ eventId, slug, email }: CreateBookingProps) => {
    try {
        await connectDB();
        await Booking.create({ eventId, slug, email });
        return { success: true };
    } catch (error) {
        console.error("Create booking failed:", error);
        return { success: false };
    }
};
