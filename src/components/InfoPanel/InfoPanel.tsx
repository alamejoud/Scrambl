import "./InfoPanel.css";

const InfoPanel = () => {
    return (
        <>
            <div
                className="modal fade"
                id="infoModal"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                How To Play
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p className="Help-module_subheading__mbRG9">
                                Guess the Wordle in 6 tries.
                            </p>
                            <section>
                                <ul className="Help-module_instructions__uXsG6">
                                    <li>
                                        Each guess must be a valid 7-letter
                                        word.
                                    </li>
                                    <li>
                                        The color of the tiles will change to
                                        show how close your guess was to the
                                        word.
                                    </li>
                                </ul>
                                <div className="htp-letter-container">
                                    <div className="htp-green-letter">
                                        <div>
                                            <div className="letter-container">
                                                P
                                            </div>
                                        </div>
                                    </div>
                                    <div className="htp-green-letter-explanation">
                                        <div className="letter-explanation-container">
                                            Letter is in the correct location
                                        </div>
                                    </div>
                                    <div className="htp-gray-letter">
                                        <div>
                                            <div className="letter-container">
                                                I
                                            </div>
                                        </div>
                                    </div>
                                    <div className="htp-gray-letter-explanation">
                                        <div className="letter-explanation-container">
                                            Letter is not in the word
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <hr />
                            <p style={{ marginBottom: 0 }}>
                                A new puzzle is released daily at midnight.
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Understood
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InfoPanel;
