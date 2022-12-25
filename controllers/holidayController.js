const db = require('../models')
const Holidays = db.Holiday
const fetch = require('node-fetch')

const holidayController = {
    updateHolidays: async (req, res) => {
        
        let url = `https://data.ntpc.gov.tw/api/datasets/308DCD75-6434-45BC-A95F-584DA4FED251/json?page=1&size=1000`;
        let calendar;
        try {
            calendar = await fetch(url).then(res => res.json());
        } catch(err) {

        }
        for(i=0; i<calendar.length; i++) {
            await Holidays.findOrCreate({
                where: { date: calendar[i].date },
                defaults: {
                    date: calendar[i].date,
                    is_holiday: (calendar[i].isholiday === "是")? 1 : 0,
                    holiday_category: calendar[i].holidaycategory,
                    description: calendar[i].description,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
              });    
        }
        return res.json("update holiday success")
    }
}

module.exports = holidayController