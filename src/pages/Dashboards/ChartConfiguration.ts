import {ChartData, ChartType} from "chart.js";

export interface ExtendedChartData extends ChartData<ChartType, number[], string> {
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    pointStyle: false;
    pointBorderColor: string;
    borderWidth: number;
    tension: number;
  }[];
}

export interface TempValues {
  [key: string]: any[];
}

export interface DataItem {
  _field: string;

  [key: string]: any;
}

// const labelValue = ['100s', '90s', '80s', '70s', '60s', '50s', '40s', '30s', '20s', '10s']

const createChartConfig = (label: string, color: string, unit: string) => {
  const maxLength = 10;

  // 임시 데이터 생성
  const tempData = Array.from({length: maxLength}, () => ({_value: Math.floor(Math.random() * 100)}));

  // 임시 데이터 처리
  const processedData = tempData.map((value: any) => value._value);

  // 라벨 생성
  const labelValue = Array.from({length: maxLength}, (_, i) => `${(i + 1) * 10}s`);

  const value: ExtendedChartData = {
    labels: labelValue,
    datasets: [
      {
        label: `${label} ${unit}`,
        data: processedData,
        borderColor: color,
        backgroundColor: color,
        pointStyle: false,
        pointBorderColor: 'rgb(0, 0, 0)',
        borderWidth: 1,
        tension: 0.15,
      },
    ],
  };
  return value;
};


const createDoubleChartConfig = (label1: string, label2: string, color1: string, color2: string) => {
  const maxLength = 10;

  const processData = (data: any[]) => {
    if (data.length < maxLength) {
      const padding = Array(maxLength - data.length).fill(null);
      data.unshift(...padding);
    }
    return data;
  };

  // 임시 데이터 생성
  const tempData1 = Array.from({ length: maxLength }, () => Math.floor(Math.random() * 100));
  const tempData2 = Array.from({ length: maxLength }, () => Math.floor(Math.random() * 100));

  // 라벨 생성
  const labelValue = Array.from({length: maxLength}, (_, i) => `${(i + 1) * 10}s`);

  const chartData = {
    labels: labelValue,
    datasets: [
      {
        label: label1,
        data: processData(tempData1),
        borderColor: color1,
        backgroundColor: color1,
        pointStyle: false,
        pointBorderColor: 'rgb(0, 0, 0)',
        borderWidth: 1,
        tension: 0.15,
      },
      {
        label: label2,
        data: processData(tempData2),
        borderColor: color2,
        backgroundColor: color2,
        pointStyle: false,
        pointBorderColor: 'rgb(0, 0, 0)',
        borderWidth: 1,
        tension: 0.15,
      },
    ],
  };

  return chartData;
};


export const CpuChartConfig = () => {
  return createChartConfig('Cpu', '#ff5b5b', 'percent');
};

export const SystemChartConfig = () => {
  return createChartConfig('System', '#FF00FF', 'percent');
}

export const UserChartConfig = () => {
  return createChartConfig('User', '#3c6fcb', 'percent');
}

export const DiskReadSizeChartConfig = () => {
  return createChartConfig('Disk', '#3399FF', 'read size');
}

export const DiskWriteSizeChartConfig = () => {
  return createChartConfig('Disk', '#3399FF', 'write size');
}

export const MemoryFreeChartConfig = () => {
  return createDoubleChartConfig('Memory free', 'Memory total', '#4CB6E4', '#F5A623');
}

export const MemoryUsedChartConfig = () => {
  return createDoubleChartConfig('Memory used', 'Memory total', '#e73168', '#F5A623');
}

export const SwapFreeChartConfig = () => {
  return createDoubleChartConfig('Swap free', 'Swap total', '#4CB6E4', '#F5A623');
}

export const SwapUsedChartConfig = () => {
  return createDoubleChartConfig('Swap used', 'Swap total', '#e73168', '#F5A623');
}