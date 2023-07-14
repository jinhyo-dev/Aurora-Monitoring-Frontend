import { ChartData, ChartType } from "chart.js";

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

const labelValue = ['100s', '90s', '80s', '70s', '60s', '50s', '40s', '30s', '20s', '10s']

const createChartConfig = (data: any, label: string, color: string, unit: string) => {
  const maxLength = 10;
  const processedData = data.slice(-maxLength).map((value: any) => value._value);

  if (processedData.length < maxLength) {
    const padding = Array(maxLength - processedData.length).fill(null);
    processedData.unshift(...padding);
  }

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

const createDoubleChartConfig = (data1: any, data2: any, label1: string, label2: string, color1: string, color2: string) => {
  const maxLength = 10;
  const processData = (data: any) => {
    const processedData = data.slice(-maxLength).map((value: any) => value._value);
    if (processedData.length < maxLength) {
      const padding = Array(maxLength - processedData.length).fill(null);
      processedData.unshift(...padding);
    }
    return processedData;
  };

  const chartData: ExtendedChartData = {
    labels: labelValue,
    datasets: [
      {
        label: label1,
        data: processData(data1),
        borderColor: color1,
        backgroundColor: color1,
        pointStyle: false,
        pointBorderColor: 'rgb(0, 0, 0)',
        borderWidth: 1,
        tension: 0.15,
      },
      {
        label: label2,
        data: processData(data2),
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


export const CpuChartConfig = (data: any) => {
  return createChartConfig(data, 'Cpu', '#ff5b5b', 'percent');
};

export const SystemChartConfig = (data: any) => {
  return createChartConfig(data, 'System', '#FF00FF', 'percent');
}

export const UserChartConfig = (data: any) => {
  return createChartConfig(data, 'User', '#3c6fcb', 'percent');
}

export const DiskReadSizeChartConfig = (data: any) => {
  return createChartConfig(data, 'Disk', '#3399FF', 'read size');
}

export const DiskWriteSizeChartConfig = (data: any) => {
  return createChartConfig(data, 'Disk', '#3399FF', 'write size');
}

export const MemoryFreeChartConfig = (data1: any, data2: any) => {
  return createDoubleChartConfig(data1, data2, 'Memory free', 'Memory total', '#4CB6E4', '#F5A623');
}

export const MemoryUsedChartConfig = (data1: any, data2: any) => {
  return createDoubleChartConfig(data1, data2, 'Memory used', 'Memory total', '#e73168', '#F5A623');
}

export const SwapFreeChartConfig = (data1: any, data2: any) => {
  return createDoubleChartConfig(data1, data2, 'Swap free', 'Swap total', '#4CB6E4', '#F5A623');
}

export const SwapUsedChartConfig = (data1: any, data2: any) => {
  return createDoubleChartConfig(data1, data2, 'Swap used', 'Swap total', '#e73168', '#F5A623');
}