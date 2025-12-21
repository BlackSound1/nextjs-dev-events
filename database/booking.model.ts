
import { Date, Schema, Types } from "mongoose";
import Event from "./event.model";

export interface IBooking extends Document {
    eventId: Types.ObjectId;
    email: string;
    createdAt: Date,
    updatedAt: Date;
};

const BookingSchema = new Schema<IBooking>(
    {
        eventId: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            required: [true, "Event ID is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            validate: {
                validator: (email: string) => {
                    const emailRegex = /^((?:[A-Za-z0-9!#$%&'*+\-\/=?^_`{|}~]|(?<=^|\.)"|"(?=$|\.|@)|(?<=".*)[ .](?=.*")|(?<!\.)\.){1,64})(@)((?:[A-Za-z0-9.\-])*(?:[A-Za-z0-9])\.(?:[A-Za-z0-9]){2,})$/gm;
                    return emailRegex.test(email);
                },
                message: "Please provide a valid email address",
            },
        }
    },
    {
        timestamps: true
    }
);

BookingSchema.pre('save', async (next) => {
    const booking = this as IBooking;

    // Only validate eventId if new or modified
    if (booking.isModified('eventId') || booking.isNew) {
        try {
            const eventExists = await Event.findById(booking.eventId).select('_id');

            if (!eventExists) {
                const error = new Error(`Event with ID ${booking.eventId} does not exist`);
                error.name = "ValidationError";
                return next(error);
            }
        } catch {
            const validationError = new Error("Invalid event ID format or database error");
            validationError.name = "ValidationError";
            return next(validationError);
        }
    }
    next();
});

BookingSchema.index({ eventId: 1 });
BookingSchema.index({ eventId: 1, createdAt: -1 });
BookingSchema.index({ email: 1 });
BookingSchema.index({ eventId: 1, email: 1 }, { unique: true, name: 'uniq_event_email'});

const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;