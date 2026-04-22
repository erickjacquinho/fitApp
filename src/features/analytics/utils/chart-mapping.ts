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
    data: any[],
    valueKey: string,
    labelKey: string,
    color?: string
  ): ChartDataItem[] => {
    return data.map((item) => ({
      value: Number(item[valueKey]) || 0,
      label: String(item[labelKey] || ''),
      frontColor: color || '#4F46E5', // Default Indigo
    }));
  },

  /**
   * Maps time-series data to LineChart format.
   */
  mapToLineChart: (
    data: any[],
    valueKey: string,
    labelKey: string,
    color?: string
  ): ChartDataItem[] => {
    return data.map((item) => ({
      value: Number(item[valueKey]) || 0,
      label: String(item[labelKey] || ''),
      dataPointText: String(item[valueKey] || '0'),
    }));
  },

  /**
   * Creates an empty data set for placeholders.
   */
  createEmptyData: (count: number = 7): ChartDataItem[] => {
    return Array.from({ length: count }, (_, i) => ({
      value: 0,
      label: '',
    }));
  },
};
