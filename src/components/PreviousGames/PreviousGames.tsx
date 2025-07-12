import "./PreviousGames.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu/Menu";
import { useState } from "react";

const PreviousGames = () => {
    const disableWeekends = (date: Dayjs) => {
        return (
            date.isBefore(dayjs(new Date("2025-07-01"))) ||
            date.isAfter(dayjs(new Date().toISOString().slice(0, 10))) ||
            date.isSame(dayjs(new Date().toISOString().slice(0, 10)))
        );
    };
    const navigate = useNavigate();

    const [dateChosen, setDateChosen] = useState("");

    const handleDateChange = (date: Dayjs | null) => {
        if (date) {
            setDateChosen(date.format("YYYY-MM-DD"));
        }
    };

    const handlePlay = () => {
        if (dateChosen) {
            navigate(`/previousGames/${dateChosen}`);
        }
    };

    return (
        <div className="previous-games-div">
            <Menu previousGamesMenu={true} />
            <div className="title-div">
                <p className="title">Previous Games</p>
            </div>
            <div className="calendar-div">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                        shouldDisableDate={disableWeekends}
                        onChange={handleDateChange}
                    />
                </LocalizationProvider>
                <div className="play-div">
                    <button
                        className="btn btn-primary"
                        onClick={handlePlay}
                        disabled={!dateChosen || dateChosen == ""}
                    >
                        Play
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PreviousGames;
