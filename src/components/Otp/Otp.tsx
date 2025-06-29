import "./Otp.css";

interface OtpProps {
    numInputs: number;
    otp: string[];
    disabled?: boolean;
    currentCursor?: number;
}

const Otp = ({ numInputs, otp }: OtpProps) => {
    return (
        <>
            {Array.from({ length: numInputs || 5 }, (_, index) => {
                return (
                    <div
                        key={index}
                        className={
                            otp[index] != "" ? "otp-input filled" : "otp-input"
                        }
                    >
                        {otp[index]}
                    </div>
                );
            })}
        </>
    );
};

export default Otp;
