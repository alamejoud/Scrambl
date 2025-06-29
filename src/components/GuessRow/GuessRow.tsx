import "./GuessRow.css";
import Otp from "../Otp/Otp";

interface GuessRowProps {
    word: string[];
    disabled?: boolean;
    index?: number;
    currentCursor: number;
    handleChange?: (otp: string, index: number) => void;
}

const GuessRow = ({ word, currentCursor }: GuessRowProps) => {
    return (
        <div className="guess-row">
            <Otp
                currentCursor={currentCursor}
                numInputs={word.length}
                otp={word}
            />
        </div>
    );
};

export default GuessRow;
