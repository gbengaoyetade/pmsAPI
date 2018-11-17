import db from '../models';
import { sendInternalServerError } from '../utils';

const { Locations } = db;
class LocationsController {
  static async create(req, res) {
    const {
      name, totalMale, totalFemale, parentId, currentUser,
    } = req.body;
    const location = {
      name,
      totalMale,
      totalFemale,
      total: 0,
      parentId: parentId || null,
      createdBy: currentUser.id,
      updatedBy: currentUser.id,
    };
    try {
      const createdLocation = await Locations.create(location);
      return res.status(201).send({ message: 'Location created', location: createdLocation });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).send({ error: 'Location name already exists' });
      }
      console.log(error);
      sendInternalServerError(res);
    }
    return false;
  }
}

export default LocationsController;
