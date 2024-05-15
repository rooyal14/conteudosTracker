export default class DateManipulation {
    static addDaysToDate (date, days) {
        date.setDate(date.getDate() + days);
        return date;
        }
    static adjustToLocalTimezone(date) {
        let minutesToChange = date.getTimezoneOffset()
        date.setMinutes(date.getMinutes() + minutesToChange)
        return date
    
    }
}
