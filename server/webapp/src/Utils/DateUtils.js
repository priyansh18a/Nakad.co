import * as moment from "moment";

export function formatDate(dateString) {
    return moment(dateString).format('DD/MM/YYYY');
}