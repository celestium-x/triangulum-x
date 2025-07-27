import { format } from 'date-fns';

export default class DateActions {
    public static getOrdinalSuffix(day: number): string {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th';
        }
    }

    public static formatFullDateTime(date: Date): string {
        const day = date.getDate();
        const ordinal = this.getOrdinalSuffix(day);
        return format(date, `d'${ordinal}' MMMM, hh:mm a`);
    }
}
