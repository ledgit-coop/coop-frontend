<template>
  <Chart
    type="bar"
    :data="chartData"
    class="w-full"
    :options="chartOptions"
  />
</template>
<script lang="ts" setup>
import { DATE_FORMAT_DB } from '@/constants';
import { dateFormat } from '@/helpers';
import ReportsService from '@/service/ReportsService';
import type { ChartReleasedLoanResponse } from '@/types/api/reports';
import { ref, watch, computed } from 'vue';
import { REPORT_SHADES_GREEN } from '@/constants/ui/reports';

interface Props {
  dateFrom?: Date;
  dateTo?: Date;
  reload?: boolean;
}

const props = defineProps<Props>();

const dataset = ref<ChartReleasedLoanResponse[]>([]);

const chartData = computed(() => {
  return {
    labels: dataset.value.map((r) => r.name),
    datasets: [
      {
        label: 'Released Loans',
        data: dataset.value.map((r) => r.count),
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
      display: false,
    },
    scales: {
      x: {
        ticks: {
          // forces step size to be 50 units
          stepSize: 50,
        },
      },
      yAxis: {
        gridLines: {
          drawBorder: false,
        },
        ticks: {
          // forces step size to be 50 units
          stepSize: 50,
        },
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
  ReportsService.chartsLoansReleased({
    from: dateFormat(props.dateFrom, DATE_FORMAT_DB),
    to: dateFormat(props.dateTo, DATE_FORMAT_DB),
  }).then(({ data }) => {
    dataset.value = data;
  });
};
</script>
