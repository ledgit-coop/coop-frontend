<template>
  <Chart
    :plugins="[Plugins]"
    type="pie"
    :data="chartData"
    :options="chartOptions"
  />
</template>
<script lang="ts" setup>
import { DATE_FORMAT_DB } from '@/constants';
import { dateFormat, formatNumber } from '@/helpers';
import ReportsService from '@/service/ReportsService';
import type { ChartRevenueResponse } from '@/types/api/reports';
import { ref, watch, computed } from 'vue';
import { REPORT_SHADES_GREEN } from '@/constants/ui/reports';
import Plugins from 'chartjs-plugin-datalabels';

interface Props {
  dateFrom?: Date;
  dateTo?: Date;
  reload?: boolean;
}

const props = defineProps<Props>();

const dataset = ref<ChartRevenueResponse[]>([]);

const chartData = computed(() => {
  return {
    labels: dataset.value.map((r) => r.name),
    datasets: [
      {
        data: dataset.value.map((r) => r.amount),
        backgroundColor: REPORT_SHADES_GREEN,
        hoverBackgroundColor: REPORT_SHADES_GREEN,
      },
    ],
  };
});

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    datalabels: {
      color: 'white',
      formatter: function (value: any) {
        return formatNumber(value);
      },
    },
  },
});

watch(
  () => props.reload,
  (value) => {
    if (value && props.dateFrom && props.dateTo) loadChart();
  }
);

const loadChart = () => {
  ReportsService.chartsRevenue({
    from: dateFormat(props.dateFrom, DATE_FORMAT_DB),
    to: dateFormat(props.dateTo, DATE_FORMAT_DB),
  }).then(({ data }) => {
    dataset.value = data;
  });
};
</script>
