const DateUtil = require('../../utils/date');
const { expect } = require('chai')

describe('# getWeekday', () => {
    context('Before time point of weekday changing, weekday should be the previous day', () => {
        let weekday_from_getWeekday = DateUtil.getWeekday("05:00:00", "2022-12-31 04:59:59");

        it('The weekday of 2022-12-31 04:59:59 should be 2022-12-30', () => {

            expect(weekday_from_getWeekday).equal("2022-12-30");
        });
    })

    context('After time point of weekday changing, getweekday can get the current weekday', () => {
        let weekday = DateUtil.getWeekday("05:00:00", "2022-12-31 05:00:00");

        it('The weekday of 2022-12-31 05:00:00 should be 2022-12-31', () => {

            expect(weekday).equal("2022-12-31");
        });
    })
})