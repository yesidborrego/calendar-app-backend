const { request, response } = require('express');
const Event = require('../models/Event');

const getEvents = async (req = request, res = response) => {
  try {
    const events = await Event.find().populate('user', 'name');
    res.status(200).json(
      {
        ok: true,
        events
      }
    )

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contact the application administrator.'
    });
  }
};

const createEvent = async (req = request, res = response) => {
  try {
    const event = new Event(req.body);
    event.user = req.uid;

    const eventSaved = await event.save();

    res.status(200).json(
      {
        ok: true,
        evento: eventSaved
      }
    )
  } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Contact the application administrator.'
      });
  }
};

const updateEvent = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    if(!event) {
      return res.status(404).json(
        {
          ok: false,
          msg: 'Event not found.'
        }
      );
    }

    if(event.user.toString() !== req.uid) {
      return res.status(401).json(
        {
          ok: false,
          msg: 'Unauthorized',
        }
      );
    };

    const eventUpdate = await Event.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(
      {
        ok: true,
        event: eventUpdate,
      }
    );

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contact the application administrator.'
    });
  }

};

const deleteEvent = async (req, res = response) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    if(!event) {
      return res.status(404).json(
        {
          ok: false,
          msg: 'Event not found.'
        }
      );
    }

    if(event.user.toString() !== req.uid) {
      return res.status(401).json(
        {
          ok: false,
          msg: 'Unauthorized',
        }
      );
    };

    await Event.findByIdAndDelete(id);
    res.status(200).json(
      {
        ok: true,
      }
    );

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contact the application administrator.'
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
};