import {
    BoardRowSection,
    BoardSection,
    DashboardMain,
    RealTimeBox,
    SidebarMovingHandler
} from "../../styles/GlobalStyle";
import NavigationBar from "./NavigationBar";
import PageName from "../components/PageName";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import {Line} from 'react-chartjs-2';
import {useCookies} from "react-cookie";
import {useCallback, useEffect, useState} from "react";
import {fetchTeamInfo} from "../../utils/Cookie";
import Loaders from "../components/Loaders/Loaders";
import Unauthorized from "../components/Error/Unauthorized";
import {useParams} from "react-router-dom";
import * as React from "react";
import {ReactComponent as AuroraLogo} from '../../assets/svg/Aurora.svg'
import {ReactComponent as AuroraLogoDark} from '../../assets/svg/AuroraDark.svg'
import useWebSocket, {ReadyState} from 'react-use-websocket';
import axiosInstance from "../../utils/AxiosInstance";
import {
    ExtendedChartData,
    TempValues,
    DataItem,
    DiskReadSizeChartConfig,
    DiskWriteSizeChartConfig
} from "./ChartConfiguraion";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
import TitleTag from '../components/TitleTag'

const withTokenValidation = (WrappedComponent: React.ComponentType) => {
    const TokenValidationComponent = () => {
        const [loading, setLoading] = useState<boolean>(true)
        const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
        const {teamId} = useParams()

        useEffect(() => {
            const checkValidity = async () => {
                const isValid = await fetchTeamInfo(teamId)
                setIsAuthorized(isValid?.success)
            };

            checkValidity().then(() => setLoading(false))
        }, []);

        return loading ? <Loaders/> : isAuthorized ? <WrappedComponent/> : <Unauthorized/>;
    };

    return TokenValidationComponent;
};

const DiskOverview = () => {
    const [cookies] = useCookies()
    const [sidebarMove, setSidebarMove] = useState<boolean>(true)

    const [diskReadData, setDiskReadData] = useState<ExtendedChartData | null>(null);
    const [diskWriteData, setDiskWriteData] = useState<ExtendedChartData | null>(null);

    useEffect(() => {
        const payload = {
            start: '-2m',
            stop: 'now()',
            key: 'f9338c3ef6d54cc182f648d8add520e2',
            windowPeriod: '10s',
        }

        const tempValues: TempValues = {
            ReadSize: [],
            WriteSize: []
        };

        axiosInstance.post("/influx/overview", payload).then((res) => {
            if (Array.isArray(res.data)) {
                res.data.forEach((v: DataItem) => {
                    if (Object.prototype.hasOwnProperty.call(tempValues, v._field)) {
                        tempValues[v._field].push(v);
                    }
                })
            } else {
                console.error("res.data is not an array")
            }
        })
            .then(() => {
                setDiskReadData(DiskReadSizeChartConfig(tempValues.ReadSize))
                setDiskWriteData(DiskWriteSizeChartConfig(tempValues.WriteSize))
            })
    }, [])

    const SOCKET_URL = import.meta.env.VITE_WS_URL;

    const messageHandler = useCallback((event: MessageEvent<any>) => {
        const tempValues: TempValues = {
            ReadSize: [],
            WriteSize: []
        };

        const data = JSON.parse(event.data);

        if (Array.isArray(data)) {
            data.forEach((v: DataItem) => {
                if (Object.prototype.hasOwnProperty.call(tempValues, v._field)) {
                    tempValues[v._field].push(v);
                }
            });
        } else {
            console.error("Event data is not an array");
        }

        setDiskReadData(DiskReadSizeChartConfig(tempValues.ReadSize))
        setDiskWriteData(DiskWriteSizeChartConfig(tempValues.WriteSize))
    }, []);

    const {sendMessage, readyState} = useWebSocket(SOCKET_URL, {
        onMessage: messageHandler,
        reconnectAttempts: 10,
        reconnectInterval: 3000,
        shouldReconnect: () => true,
    });

    useEffect(() => {
        const timerId = setInterval(() => {
            if (readyState === ReadyState.OPEN) {
                sendMessage(
                    JSON.stringify({
                        event: 'disk',
                        data: {
                            start: '-2m',
                            stop: 'now()',
                            key: 'f9338c3ef6d54cc182f648d8add520e2',
                            windowPeriod: '10s',
                        },
                    }),
                );
            } else {
                console.log('WebSocket is not connected');
            }
        }, 10000);

        return () => clearInterval(timerId)
    }, [readyState, sendMessage]);

    useEffect(() => {
        setSidebarMove(true)
        setTimeout(() => {
            setSidebarMove(false)
        }, 500)
    }, [cookies.sidebarStatus])

    const boxNameStyle = {
        fontSize: cookies.sidebarStatus === 'closed' ? '1.2rem' : '0.9rem',
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: false,
            },
            legend: {
                display: false,
                labels: {
                    boxWidth: 0,
                    usePointStyle: true,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                border: {dash: [4, 4]},
                ticks: {
                    color: cookies.theme === 'dark' ? '#aaa' : '#888',
                    font: {
                        size: 10,
                    },
                },
                grid: {
                    tickBorderDash: [2, 3],
                    tickLength: 10,
                    color: cookies.theme === 'dark' ? '#383838' : '#eee',
                },
            },
            x: {
                beginAtZero: false,
                ticks: {
                    color: cookies.theme === 'dark' ? '#aaa' : '#888',
                    font: {
                        size: 8,
                    },
                },
                grid: {
                    display: false,
                },
            },
        },
        bezierCurve: true,
    };

    return (
        <DashboardMain>
            <NavigationBar active={2}/>
            {sidebarMove ?
                (
                    <SidebarMovingHandler>
                        {cookies.theme === 'dark' ? <AuroraLogo/> : <AuroraLogoDark/>}
                    </SidebarMovingHandler>
                ) :
                (
                    <>
                        <TitleTag title={'Disk Overview'}/>
                        <BoardSection>
                            <PageName name={'Disk Overview'}/>

                            <BoardRowSection style={{height: '50%'}}>
                                <RealTimeBox width={'100%'} $leftGap={true} $rightGap={true}>
                                    <div className={'box-name'} style={boxNameStyle}>Disk - Read
                                        Size<span>unit: size</span></div>
                                    <div className={'chart-container'}>
                                        {diskReadData &&
                                            <Line options={options} data={diskReadData} className={'chart'}/>}
                                    </div>
                                </RealTimeBox>
                            </BoardRowSection>

                            <BoardRowSection style={{height: '50%'}}>
                                <RealTimeBox width={'100%'} $leftGap={true} $rightGap={true}>
                                    <div className={'box-name'} style={boxNameStyle}>Disk - Write
                                        Size<span>unit: size</span></div>
                                    <div className={'chart-container'}>
                                        {diskWriteData &&
                                            <Line options={options} data={diskWriteData} className={'chart'}/>}
                                    </div>
                                </RealTimeBox>
                            </BoardRowSection>

                        </BoardSection>
                    </>
                )
            }
        </DashboardMain>
    )
}

const EnhancedMain = withTokenValidation(DiskOverview);

export default EnhancedMain;