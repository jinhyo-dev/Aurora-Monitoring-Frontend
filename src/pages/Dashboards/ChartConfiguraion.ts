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
  const value: ExtendedChartData = {
    labels: labelValue,
    datasets: [
      {
        label: 'Memory free',
        data: data1.slice(-10).map((value: any) => value._value),
        borderColor: '#4CB6E4',
        backgroundColor: '#4CB6E4',
        pointStyle: false,
        pointBorderColor: 'rgb(0, 0, 0)',
        borderWidth: 1,
        tension: 0.15
      },
      {
        label: 'Memory total',
        data: data2.slice(-10).map((value: any) => value._value),
        borderColor: '#F5A623',
        backgroundColor: '#F5A623',
        pointStyle: false,
        pointBorderColor: 'rgb(0, 0, 0)',
        borderWidth: 1,
        tension: 0.15
      }
    ]
  }
  return value
}

export const MemoryUsedChartConfig = (data1: any, data2: any) => {
  const value: ExtendedChartData = {
    labels: labelValue,
    datasets: [
      {
        label: 'Memory used',
        data: data1.slice(-10).map((value: any) => value._value),
        borderColor: '#e73168',
        backgroundColor: '#e73168',
        pointStyle: false,
        pointBorderColor: 'rgb(0, 0, 0)',
        borderWidth: 1,
        tension: 0.15
      },
      {
        label: 'Memory total',
        data: data2.slice(-10).map((value: any) => value._value),
        borderColor: '#F5A623',
        backgroundColor: '#F5A623',
        pointStyle: false,
        pointBorderColor: 'rgb(0, 0, 0)',
        borderWidth: 1,
        tension: 0.15
      }
    ]
  }
  return value
}

export const SwapFreeChartConfig = (data1: any, data2: any) => {
  const value: ExtendedChartData = {
    labels: labelValue,
    datasets: [
      {
        label: 'Swap free',
        data: data1.slice(-10).map((value: any) => value._value),
        borderColor: '#4CB6E4',
        backgroundColor: '#4CB6E4',
        pointStyle: false,
        pointBorderColor: 'rgb(0, 0, 0)',
        borderWidth: 1,
        tension: 0.15
      },
      {
        label: 'Swap total',
        data: data2.slice(-10).map((value: any) => value._value),
        borderColor: '#F5A623',
        backgroundColor: '#F5A623',
        pointStyle: false,
        pointBorderColor: 'rgb(0, 0, 0)',
        borderWidth: 1,
        tension: 0.15
      }
    ]
  }
  return value
}

export const SwapUsedChartConfig = (data1: any, data2: any) => {
  const value: ExtendedChartData = {
    labels: labelValue,
    datasets: [
      {
        label: 'Swap used',
        data: data1.slice(-10).map((value: any) => value._value),
        borderColor: '#e73168',
        backgroundColor: '#e73168',
        pointStyle: false,
        pointBorderColor: 'rgb(0, 0, 0)',
        borderWidth: 1,
        tension: 0.15
      },
      {
        label: 'Swap total',
        data: data2.slice(-10).map((value: any) => value._value),
        borderColor: '#F5A623',
        backgroundColor: '#F5A623',
        pointStyle: false,
        pointBorderColor: 'rgb(0, 0, 0)',
        borderWidth: 1,
        tension: 0.15
      }
    ]
  }
  return value
}