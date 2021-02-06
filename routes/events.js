/*
* Event routes
* /api/events
*
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { filedsValiadate } = require('../middlewares/filedsValiadate');
const { validToken } = require('../middlewares/validToken');
const router = Router();

router.use(validToken); // Todas las rutas Validan el token, todas las rutas que se encuentren desde éste punto en adelante serán válidadas

router.get('/', getEvents);
router.post(
    '/',
    [
      check('title', 'The title is required').not().isEmpty(),
      check('start', 'The start date is required').not().isEmpty(),
      check('start', 'The start date must be a valid date').custom(isDate),
      check('end', 'The end date is required').not().isEmpty(),
      check('end', 'The end date must be a valid date').custom(isDate),
      filedsValiadate
    ],
    createEvent
  );
router.put(
    '/:id',
    [
      check('title', 'The title is required').not().isEmpty(),
      check('start', 'The start date is required').not().isEmpty(),
      check('start', 'The start date must be a valid date').custom(isDate),
      check('end', 'The end date is required').not().isEmpty(),
      check('end', 'The end date must be a valid date').custom(isDate),
      filedsValiadate
    ],
    updateEvent
  );
router.delete('/:id',
    [
      check('id', 'The id is required').not().isEmpty(),
      filedsValiadate
    ],
    deleteEvent
  );

module.exports = router;