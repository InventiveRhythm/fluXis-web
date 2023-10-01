export default class TimeUtils {
    static formatSeconds(secs) {
        let months = Math.floor(secs / 2592000);
        let days = Math.floor(secs / 86400);
        let hours = Math.floor(secs / 3600);
        let minutes = Math.floor(secs / 60);
        let seconds = Math.floor(secs % 60);

        if (months > 0) return (months > 1) ? (months + " months ") : (months + " month ");
        if (days > 0) return (days > 1) ? (days + " days ") : (days + " day ");
        if (hours > 0) return (hours > 1) ? (hours + " hours ") : (hours + " hour ");
        if (minutes > 0) return (minutes > 1) ? (minutes + " minutes ") : (minutes + " minute ");
        if (seconds >= 30) return (seconds > 1) ? (seconds + " seconds") : (seconds + " second");

        return "just now";
    }

    static formatAgo(secs)  {
        let formatted = TimeUtils.formatSeconds(Date.now() / 1000 - secs);

        if (formatted !== "just now")
            return formatted + " ago";

        return formatted;
    }

    static formatDate(secs) {
        return new Date(secs * 1000).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }
}