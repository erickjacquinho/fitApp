export interface ChartDataItem {
  value: number;
  label?: string;
  frontColor?: string;
  dataPointText?: string;
}

export const ChartMappingUtils = {
  mapToBarChart: (
    data: Record<string, unknown>[],
    valueKey: string,
    labelKey: string,
    color?: string
  ): ChartDataItem[] => {
    return data.map((item) => ({
      value: Number(item[valueKey]) || 0,
      label: String(item[labelKey] || ''),
      ...(color !== undefined && { frontColor: color }),
    }));
  },

  mapToLineChart: (
    data: Record<string, unknown>[],
    valueKey: string,
    labelKey: string,
    color?: string
  ): ChartDataItem[] => {
    return data.map((item) => ({
      value: Number(item[valueKey]) || 0,
      label: String(item[labelKey] || ''),
      ...(color !== undefined && { frontColor: color }),
      dataPointText: String(item[valueKey] || '0'),
    }));
  },

  createEmptyData: (count: number = 7): ChartDataItem[] => {
    return Array.from({ length: count }, () => ({
      value: 0,
      label: '',
    }));
  },
};
