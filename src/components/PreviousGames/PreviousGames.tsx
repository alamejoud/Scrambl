import "./PreviousGames.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const PreviousGames = () => {
    const disableWeekends = (date: Dayjs) => {
        return (
            date.isBefore(dayjs(new Date("2025-07-01"))) ||
            date.isAfter(dayjs(new Date().toISOString().slice(0, 10))) ||
            date.isSame(dayjs(new Date().toISOString().slice(0, 10)))
        );
    };
    const navigate = useNavigate();

    const handleDateChange = (date: Dayjs | null) => {
        if (date) {
            const formatted = date.format("YYYY-MM-DD");
            navigate(`/previousGames/${formatted}`);
        }
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                shouldDisableDate={disableWeekends}
                onChange={handleDateChange}
            />
        </LocalizationProvider>
    );
};

export default PreviousGames;
