import { BarChart } from "@mui/x-charts";
import "./ScorePanel.css";
import type { Stats } from "../../vo/Stats";

const ScorePanel = () => {
    let stats: Stats;
    if (!localStorage.getItem("stats")) {
        stats = {
            timesPlayed: 0,
            timesWon: 0,
            currentStreak: 0,
            bestStreak: 0,
            totalStats: [
                { guess: 1, times: 0 },
                { guess: 2, times: 0 },
                { guess: 3, times: 0 },
                { guess: 4, times: 0 },
                { guess: 5, times: 0 },
                { guess: 6, times: 0 },
            ],
        };
    } else {
        stats = JSON.parse(localStorage.getItem("stats") ?? "{}");
    }
    const raw = stats.totalStats;
    const dataset = raw.map((d) => ({
        ...d,
        bar: d.times + 1, // 🆕 bar gets +1
    }));
    return (
        <>
            <div
                className="modal fade"
                id="scoreModal"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header stats-modal-header">
                            <div></div>
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                Statistics
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "space-evenly",
                                    marginBottom: 16,
                                }}
                            >
                                <div style={{ textAlign: "center" }}>
                                    <div
                                        style={{
                                            fontSize: 28,
                                            fontWeight: 600,
                                        }}
                                    >
                                        {stats.timesPlayed}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 12,
                                            color: "#888",
                                        }}
                                    >
                                        Played
                                    </div>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <div
                                        style={{
                                            fontSize: 28,
                                            fontWeight: 600,
                                        }}
                                    >
                                        {stats.timesPlayed == 0
                                            ? 0
                                            : Math.round(
                                                  (stats.timesWon /
                                                      stats.timesPlayed) *
                                                      100
                                              )}
                                        %
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 12,
                                            color: "#888",
                                        }}
                                    >
                                        Success Rate
                                    </div>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <div
                                        style={{
                                            fontSize: 28,
                                            fontWeight: 600,
                                        }}
                                    >
                                        {stats.currentStreak}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 12,
                                            color: "#888",
                                        }}
                                    >
                                        Current Streak
                                    </div>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <div
                                        style={{
                                            fontSize: 28,
                                            fontWeight: 600,
                                        }}
                                    >
                                        {stats.bestStreak}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 12,
                                            color: "#888",
                                        }}
                                    >
                                        Best Streak
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <p className="guess-dist">Guess Distribution</p>

                            <BarChart
                                dataset={dataset}
                                height={200}
                                layout="horizontal"
                                margin={{
                                    top: 20,
                                    right: 0,
                                    bottom: 4,
                                    left: 28,
                                }}
                                xAxis={[{ position: "none" }]}
                                yAxis={[
                                    {
                                        scaleType: "band",
                                        dataKey: "guess",
                                        width: 22,
                                        disableLine: true,
                                        disableTicks: true,
                                        tickLabelStyle: {
                                            fill: "#E0E3E7",
                                            fontSize: 13,
                                            fontWeight: 500,
                                        },
                                    },
                                ]}
                                series={[
                                    {
                                        dataKey: "bar",
                                        color: "#5B6575",
                                        valueFormatter: (_, ctx) =>
                                            raw[ctx.dataIndex].times.toString(),
                                    },
                                ]}
                                barLabel={(item) => {
                                    const value = item?.value ?? 0;
                                    return value < 1
                                        ? "0"
                                        : (value - 1).toString();
                                }}
                                borderRadius={1}
                                slotProps={{ tooltip: { trigger: "none" } }}
                                axisHighlight={{ x: "none", y: "none" }}
                                sx={{
                                    "& .MuiBarElement-root": { rx: 2 },
                                    "& .MuiBarLabel-root": {
                                        fill: "#E0E3E7",
                                        fontSize: 12,
                                        fontWeight: 600,
                                    },
                                }}
                            />
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

export default ScorePanel;
