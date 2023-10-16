import type { Pagination } from '@/types/ui';
import { computed, ref, type Ref } from 'vue';

export default function useTableParameters(filters: Ref<any>) {
  const rows = ref<number | undefined>(0);
  const totalRecords = ref<number | undefined>(0);
  const currentPage = ref<number>(1);
  const currentLimit = ref<number | undefined>(undefined);
  const sortField = ref<string | undefined>();
  const sortOrder = ref<'asc' | 'desc' | undefined>();

  const onSort = (event: any) => {
    sortField.value = event.sortField;
    sortOrder.value = event.sortOrder < 0 ? 'asc' : 'desc';
  };

  const paginate = (pagination: Pagination) => {
    rows.value = pagination.per_page;
    totalRecords.value = pagination.total;
  };

  const onPageChange = (event: any) => {
    currentPage.value = event.page + 1;
  };

  const onRowsChange = (event: any) => {
    currentLimit.value = event;
  };

  const params = computed(() => ({
    filters: filters.value,
    limit: currentLimit.value,
    page: currentPage.value,
    sortField: sortField.value,
    sortOrder: sortOrder.value,
  }));

  return {
    onSort,
    rows,
    params,
    totalRecords,
    onPageChange,
    paginate,
    onRowsChange,
  };
}
