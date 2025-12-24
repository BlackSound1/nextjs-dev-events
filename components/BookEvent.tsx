"use client";

import { createBooking } from "@/lib/actions/booking.actions";
import posthog from "posthog-js";
import { useState } from "react";

interface BookEventProps {
    eventId: string;
    slug: string;
}

export default function BookEvent({ eventId, slug }: BookEventProps) {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { success } = await createBooking({ eventId, slug, email });

        if (success) {
            setSubmitted(true);
            posthog.capture("event_booked", { eventId, slug, email });
        } else {
            console.error("Booking creation failed");
            posthog.captureException("Booking creation failed");
        }
    }

    return (
        <div id="book-event">
            {
                submitted? (
                    <p className="text-sm">Thank you for signing up!</p> 
                ): (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email">Email Address</label>
                            <input 
                                id="email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                            />
                        </div>
                        <button className="button-submit" type="submit">Submit</button>
                    </form>
                )
            }
        </div>
    );
};
