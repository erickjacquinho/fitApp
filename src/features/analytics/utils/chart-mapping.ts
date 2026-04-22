/**
 * Utility functions to map database result sets to chart data formats.
 * Primarily designed for 'react-native-gifted-charts'.
 */

export interface ChartDataItem {
  value: number;
  label?: string;
  frontColor?: string;
  dataPointText?: string;
}

export const ChartMappingUtils = {
  /**
   * Maps a simple object array to BarChart format.
   * Expects items with a numeric value and a label.
   */
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

  /**
   * Maps time-series data to LineChart format.
   */
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

  /**
   * Creates an empty data set for placeholders.
   */
  createEmptyData: (count: number = 7): ChartDataItem[] => {
    return Array.from({ length: count }, () => ({
      value: 0,
      label: '',
    }));
  },
};
