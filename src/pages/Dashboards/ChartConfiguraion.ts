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

export const CpuChartConfig = (data: any) => {
  const value: ExtendedChartData = {
    labels: labelValue,
    datasets: [
      {
        label: 'Cpu percent',
        data: data.slice(-10).map((value: any) => value._value),
        borderColor: '#ff5b5b',
        backgroundColor: '#ff5b5b',
        pointStyle: false,
        pointBorderColor: 'rgb(0, 0, 0)',
        borderWidth: 1,
        tension: 0.15
      }
    ]
  }
  return value
}

export const SystemChartConfig = (data: any) => {
  const value: ExtendedChartData = {
    labels: labelValue,
    datasets: [
      {
        label: 'System percent',
        data: data.slice(-10).map((value: any) => value._value),
        borderColor: '#FF00FF',
        backgroundColor: '#FF00FF',
        pointStyle: false,
        pointBorderColor: 'rgb(0, 0, 0)',
        borderWidth: 1,
        tension: 0.15
      }
    ]
  }
  return value
}

export const UserChartConfig = (data: any) => {
  const value: ExtendedChartData = {
    labels: labelValue,
    datasets: [
      {
        label: 'User percent',
        data: data.slice(-10).map((value: any) => value._value),
        borderColor: '#3c6fcb',
        backgroundColor: '#3c6fcb',
        pointStyle: false,
        pointBorderColor: 'rgb(0, 0, 0)',
        borderWidth: 1,
        tension: 0.15
      }
    ]
  }
  return value
}

export const DiskReadSizeChartConfig = (data: any) => {
  const value: ExtendedChartData = {
    labels: labelValue,
    datasets: [
      {
        label: 'Disk read size',
        data: data.slice(-10).map((value: any) => value._value),
        borderColor: '#3399FF',
        backgroundColor: '#3399FF',
        pointStyle: false,
        pointBorderColor: 'rgb(0, 0, 0)',
        borderWidth: 1,
        tension: 0.15
      }
    ]
  }
  return value
}

export const DiskWriteSizeChartConfig = (data: any) => {
  const value: ExtendedChartData = {
    labels: labelValue,
    datasets: [
      {
        label: 'Disk write size',
        data: data.slice(-10).map((value: any) => value._value),
        borderColor: '#3399FF',
        backgroundColor: '#3399FF',
        pointStyle: false,
        pointBorderColor: 'rgb(0, 0, 0)',
        borderWidth: 1,
        tension: 0.15
      }
    ]
  }
  return value
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