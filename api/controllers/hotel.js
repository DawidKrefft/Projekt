import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};
export const updateHotel = async (req, res, next) => {
  try {
    // mongoDB set method , new true to prevent showing previous
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json('Hotel has been deleted');
  } catch (err) {
    next(err);
  }
};
export const deleteAllHotels = async (req, res, next) => {
  try {
    await Hotel.deleteMany();
    res.status(200).json('ALL HOTELS DELETED');
  } catch (err) {
    next(err);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    // mongo $gt greater than $lt less than
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',');
  try {
    const list = await Promise.all(
      cities.map(city => {
        // mangoDB countDocuments method
        return Hotel.countDocuments({ city: city });
      }),
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
    const houseCount = await Hotel.countDocuments({ type: 'house' });
    const cabinCount = await Hotel.countDocuments({ type: 'cabin' });
    const camperCount = await Hotel.countDocuments({ type: 'camper' });
    const innCount = await Hotel.countDocuments({ type: 'inn' });

    res.status(200).json([
      { type: 'hotels', count: hotelCount },
      { type: 'houses', count: houseCount },
      { type: 'cabins', count: cabinCount },
      { type: 'campers', count: camperCount },
      { type: 'inns', count: innCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map(room => {
        return Room.findById(room);
      }),
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
