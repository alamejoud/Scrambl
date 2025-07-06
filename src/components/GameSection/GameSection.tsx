import { useCallback, useEffect, useState } from "react";
import GuessRow from "../GuessRow/GuessRow";
import CryptoJS from "crypto-js";
import "./GameSection.css";
import InfoPanel from "../InfoPanel/InfoPanel";
import * as bootstrap from "bootstrap";

const dateKey = new Date().toISOString().slice(0, 10);

function encrypt(word: string) {
    return CryptoJS.AES.encrypt(word, dateKey).toString();
}

function decrypt(word: string) {
    const bytes = CryptoJS.AES.decrypt(word, dateKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

const res = await fetch(
    "https://random-word-api.herokuapp.com/word?number=1000&length=7"
);
const words = await res.json();
const seed = [...dateKey].reduce(
    (acc, char, currentIndex) => acc + char.charCodeAt(0) * currentIndex,
    0
);
const index = seed % words.length;

const wordSaved = (): string => {
    const savedWord = JSON.parse(localStorage.getItem("word") || "{}");
    if (savedWord && savedWord.date && savedWord.date === dateKey) {
        return decrypt(savedWord.todaysWord);
    } else {
        const todaysWord = words[index];
        localStorage.setItem(
            "word",
            JSON.stringify({
                date: dateKey,
                todaysWord: encrypt(todaysWord),
            })
        );
        localStorage.removeItem("otp");
        return todaysWord;
    }
};

const randomWord = (): string => {
    return words[Math.floor(Math.random() * words.length)];
};

const dailyWord = wordSaved();

const otpSaved = (): string[][] => {
    const savedOtp = localStorage.getItem("otp");
    return savedOtp
        ? JSON.parse(savedOtp)
        : Array.from({ length: 6 }, () => Array.from({ length: 7 }, () => ""));
};

interface GameSectionProps {
    gameMode: string;
}

const GameSection = ({ gameMode }: GameSectionProps) => {
    const [word] = useState(() =>
        gameMode === "dailyGame" ? dailyWord : randomWord()
    );
    const [otp, setOtp] = useState(
        gameMode === "dailyGame"
            ? otpSaved()
            : Array.from({ length: 6 }, () =>
                  Array.from({ length: 7 }, () => "")
              )
    );
    const [currentGuess, setCurrentGuess] = useState(
        otp.findIndex((value) => value[0] === "") !== -1
            ? otp.findIndex((value) => value[0] === "")
            : 6
    );
    const [currentCursor, setCurrentCursor] = useState(0);

    const [shuffledWord, setShuffledWord] = useState(
        [...new Set(word.split(""))].sort(() => Math.random() - 0.5).join("")
    );

    const [toastMessage, setToastMessage] = useState("");

    const isCorrect = useCallback(
        () =>
            otp.some(
                (row) => row.join("").toUpperCase() === word.toUpperCase()
            ) &&
            currentGuess >=
                (otp.findIndex((value) => value[0] === "") !== -1
                    ? otp.findIndex((value) => value[0] === "")
                    : 6),
        [otp, currentGuess, word]
    );

    const isFinished = useCallback(() => {
        return currentGuess >= 6 || isCorrect();
    }, [isCorrect, currentGuess]);

    const handleToast = useCallback(
        (index: number) => {
            const toastLiveExample = document.getElementById("liveToast");
            const toastMessages = [
                "Genius",
                "Magnificent",
                "Impressive",
                "Splendid",
                "Great",
                "Phew",
                word.toUpperCase(),
            ];
            if (toastLiveExample) {
                setToastMessage(toastMessages[index]);
                new bootstrap.Toast(toastLiveExample, {
                    autohide: false,
                }).show();
            }
        },
        [word]
    );

    const handleEnter = useCallback(() => {
        if (currentGuess < 6) {
            const currentRow = otp[currentGuess];
            const guess = currentRow.join("").toUpperCase();
            const actual = word.toUpperCase();

            if (guess === actual) {
                handleToast(currentGuess);
                setCurrentCursor(0);
                if (gameMode === "dailyGame")
                    localStorage.setItem("otp", JSON.stringify(otp));
                return setCurrentGuess(6);
            }

            if (currentGuess < 6 && currentRow[word.length - 1] !== "") {
                const invalidRow = document.querySelectorAll(".guess-row")[
                    currentGuess
                ] as HTMLElement;
                invalidRow.classList.add("guess-row-invalid");
                invalidRow
                    .querySelectorAll(".otp-input")
                    .forEach((input, index) => {
                        const inputElem = input as HTMLElement;
                        if (
                            inputElem.innerHTML.toUpperCase() ===
                            word.charAt(index).toUpperCase()
                        ) {
                            inputElem.classList.add("green");
                        } else if (
                            word
                                .toUpperCase()
                                .indexOf(inputElem.innerHTML.toUpperCase()) !==
                            -1
                        ) {
                            inputElem.classList.add("gray");
                        }
                    });
                setCurrentCursor(0);
                if (gameMode === "dailyGame")
                    localStorage.setItem("otp", JSON.stringify(otp));
                setCurrentGuess((prevGuess) => {
                    return prevGuess + 1;
                });
            }

            if (currentGuess === 5) {
                setCurrentCursor(0);
                setCurrentGuess(6);
                handleToast(6);
            }
        }
    }, [currentGuess, otp, handleToast, word, gameMode]);

    const handleBackspace = useCallback(() => {
        if (isFinished()) return;
        if (currentCursor > 0) {
            const currWord = otp[currentGuess] || [];
            currWord[currentCursor - 1] = "";
            setOtp((prev) => {
                const newOtp = [...prev];
                newOtp[currentGuess] = currWord;
                return newOtp;
            });
            setCurrentCursor(currentCursor - 1);
        }
    }, [otp, currentGuess, currentCursor, isFinished]);

    const handleLetterButton = useCallback(
        (letter: string) => {
            const currWord = otp[currentGuess] || [];
            if (isFinished()) return;
            if (
                currentCursor < word.length &&
                word.toUpperCase().includes(letter.toUpperCase())
            ) {
                currWord[currentCursor] = letter;
                setOtp((prev) => {
                    const newOtp = [...prev];
                    newOtp[currentGuess] = currWord;
                    return newOtp;
                });
                setCurrentCursor(currentCursor + 1);
            }
        },
        [otp, currentGuess, currentCursor, isFinished, word]
    );

    useEffect(() => {
        document.querySelectorAll(".guess-row").forEach((row) => {
            if (row.querySelector(".otp-input")?.innerHTML != "") {
                row.querySelectorAll(".otp-input").forEach((input, index) => {
                    if (
                        input.innerHTML.toUpperCase() ===
                        word.charAt(index).toUpperCase()
                    ) {
                        input.classList.add("green");
                    } else if (
                        word
                            .toUpperCase()
                            .indexOf(input.innerHTML.toUpperCase()) != -1
                    ) {
                        input.classList.add("gray");
                    }
                });
            }
        });
    }, [currentGuess, word]);

    useEffect(() => {
        if (currentCursor < word.length && !isFinished()) {
            document.querySelectorAll(".otp-input").forEach((input, index) => {
                if (index === currentCursor + currentGuess * word.length) {
                    input.classList.add("filled");
                } else if (index > currentCursor + currentGuess * word.length) {
                    input.classList.remove("filled");
                }
            });
        }
    }, [otp, currentCursor, currentGuess, isFinished, word]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isFinished()) return;
            const key = event.key.toUpperCase();

            if (currentCursor != 0 && key === "BACKSPACE") {
                handleBackspace();
            } else if (currentCursor >= word.length && key === "ENTER") {
                handleEnter();
            } else if (currentCursor < word.length && /^[A-Z]$/.test(key)) {
                handleLetterButton(key);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [
        handleBackspace,
        handleEnter,
        handleLetterButton,
        isFinished,
        currentCursor,
        word,
    ]);

    return (
        <div className="game-section">
            <div className="rows-container">
                {Array.from({ length: 6 }, (_, index) => (
                    <GuessRow
                        word={otp[index]}
                        key={index}
                        currentCursor={currentCursor}
                        disabled={index > currentGuess}
                    />
                ))}
            </div>
            <div className="buttons-container">
                <div className="letters-container">
                    <div>
                        {shuffledWord.split("").map((letter, idx) => {
                            return (
                                <button
                                    key={idx}
                                    className="btn btn-secondary game-button letter-button"
                                    onClick={() => {
                                        handleLetterButton(letter);
                                    }}
                                    disabled={
                                        isFinished() ||
                                        currentCursor >= word.length
                                    }
                                >
                                    {letter.toUpperCase()}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="action-container">
                    <div>
                        <button
                            className="btn btn-secondary game-button shuffle-button"
                            onClick={() => {
                                setShuffledWord(
                                    [...new Set(word.split(""))]
                                        .sort(() => Math.random() - 0.5)
                                        .join("")
                                );
                            }}
                            disabled={isFinished()}
                        >
                            <i className="bi bi-arrow-clockwise"></i>
                        </button>
                        <button
                            className="btn btn-primary game-button enter-button"
                            onClick={handleEnter}
                            disabled={
                                isFinished() || currentCursor < word.length
                            }
                        >
                            Enter
                        </button>
                        <button
                            className="btn btn-secondary game-button delete-button"
                            onClick={handleBackspace}
                            disabled={isFinished() || currentCursor === 0}
                        >
                            <i className="bi bi-backspace"></i>
                        </button>
                    </div>
                </div>
            </div>
            <InfoPanel />
            <div className="toast-container top-0 start-50 translate-middle-x">
                <div
                    id="liveToast"
                    className="toast"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    {toastMessage}
                </div>
            </div>
        </div>
    );
};

export default GameSection;
