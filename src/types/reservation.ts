export default interface Reservation {
	_id: string,
	bookingDate: string,
	serviceMinute: number,
	user: string,
	shop: {
        _id: string,
        name: string,
        address: string,
        tel: string,
        picture: string
    },
    createdAt: string,
}