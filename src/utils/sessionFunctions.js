export const generateFreeSeatNumbers = (totalSeats, occupiedSeats, rows = "ABCDEFGHIKLMN", seatsPerRow = 20) => {
    const occupiedNumbers = occupiedSeats.map(s => s.seatNumber);
    const freeSeats = [];
    for (let r of rows) {
        for (let i = 1; i <= seatsPerRow; i++) {
            const seat = `${r}${i}`;
            if (!occupiedNumbers.includes(seat)) {
                freeSeats.push(seat);
            };
        };
    };
    return freeSeats;
};

export function calculateAvailableSeats(session) {
    if (!session?.seats) {
        return 0;
    }
    return session.seats.total - session.seats.reserved.length;
};
