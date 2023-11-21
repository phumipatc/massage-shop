import Reservation from "./reservation";

export default interface Reservations {
    success: boolean;
	count: number;
	data: Reservation[];	
}