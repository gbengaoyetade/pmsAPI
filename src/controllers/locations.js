import db from '../models';
import {
  sendInternalServerError,
  updateParentLocation,
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
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(409).send({ error: 'Location name already exists' });
      } else {
        sendInternalServerError(res);
      }
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

  static async deleteLocation(req, res) {
    const { id } = req.params;

    try {
      const location = await Locations.findByPk(id);
      if (!location) {
        res.status(404).send({ error: 'Location does not exist' });
      } else {
        if (location.parentId) {
          await updateParentLocation(location, true);
        }

        await Locations.destroy({ where: { id } });
        res.send({ message: 'Location deleted successfully' });
      }
    } catch (error) {
      sendInternalServerError(res);
    }
  }
}

export default LocationsController;
