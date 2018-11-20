import db from '../models';
import {
  sendInternalServerError,
  sendLocationCatchError,
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
} from '../utils';

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
      res
        .status(201)
        .send({ message: 'Location created', location: createdLocation });
    } catch (error) {
      sendLocationCatchError(error, res);
    }
  }

  static async getAll(req, res) {
    const limit = req.query.limit || DEFAULT_LIMIT;
    const offset = req.query.offset || DEFAULT_OFFSET;
    try {
      const result = await Locations.findAndCountAll({
        offset,
        limit,
        include: [{ model: Locations, as: 'childLocation' }],
        order: [['createdAt', 'ASC']],
      });
      if (result.rows.length > 0) {
        const locationPayload = {
          locations: result.rows,
          pageCount: Math.ceil(result.count / limit),
          count: result.count,
        };
        return res.send(locationPayload);
      }
      return res.status(404).send({ error: 'No locations found' });
    } catch (error) {
      return sendInternalServerError(res);
    }
  }

  static async updateLocation(req, res) {
    const { id } = req.params;
    const { body } = req;

    delete body.parentId;
    delete body.id;

    const location = await Locations.findByPk(id);
    if (!location) {
      res.status(404).send({ error: 'Location does not exist' });
    } else {
      const newLocationDetails = {
        totalFemale: body.totalFemale || location.totalFemale,
        totalMale: body.totalMale || location.totalMale,
        name: body.name || location.name,
      };
      newLocationDetails.total = Number(newLocationDetails.totalFemale)
        + Number(newLocationDetails.totalMale);
      try {
        await Locations.update(newLocationDetails, { where: { id } });
        const updatedLocation = await Locations.findByPk(id);

        res.send({
          message: 'Location updated successfully',
          location: updatedLocation,
        });
      } catch (error) {
        sendLocationCatchError(error, res);
      }
    }
  }

  static async deleteLocation(req, res) {
    const { id } = req.params;

    try {
      const location = await Locations.findByPk(id);
      if (!location) {
        res.status(404).send({ error: 'Location does not exist' });
      } else {
        await Locations.destroy({ where: { id } });
        res.send({ message: 'Location deleted successfully' });
      }
    } catch (error) {
      sendInternalServerError(res);
    }
  }
}

export default LocationsController;
