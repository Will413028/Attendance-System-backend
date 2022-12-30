const db = require('../models');
const Holidays = db.Holiday;
const fetch = require('node-fetch');
const config = require('../config/config');

const holidayController = {
    updateHolidays: async (req, res) => {
        let holiday_url = config.HOLIDAY.URL;
        let calendar;
        try {
            calendar = await fetch(holiday_url).then(res => res.json());
        } catch (err) {
            return res.status(400).json({ error: `fetch calendar failed: ${err}` });
        }

        const trx = await db.sequelize.transaction();

        try {
            for (i = 0; i < calendar.length; i++) {
                await Holidays.findOrCreate({
                    where: { date: calendar[i].date },
                    defaults: {
                        date: calendar[i].date,
                        is_holiday: (calendar[i].isholiday === "是") ? 1 : 0,
                        holiday_category: calendar[i].holidaycategory,
                        description: calendar[i].description,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }
                });
            }
            await trx.commit();
        } catch (error) {
            await trx.rollback();
            return res.status(400).json({ error: `update holiday failed: ${error}` });
        }
        return res.status(200).json({ message: 'update holiday success' });
    }
}

module.exports = holidayController