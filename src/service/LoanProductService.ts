import type { AxiosPromise } from 'axios';
import apiClient from '@/http-common';
import type { LoanProductListPayload, LoanProductListResponse, ProductSavePayload } from '@/types/api/loan-product';
import type { LoanProduct } from '@/types/ui/loan-products';

const PATH = '/api/loan-products';
class LoanProductService {
  list(params?: LoanProductListPayload): AxiosPromise<LoanProductListResponse> {
    return apiClient.get(`${PATH}`, { params });
  }

  store(params: ProductSavePayload): AxiosPromise<LoanProduct> {
    return apiClient.post(`${PATH}`, params);
  }

  show(id: number): AxiosPromise<LoanProduct> {
    return apiClient.get(`${PATH}/${id}`);
  }

  update(id: number, params: ProductSavePayload): AxiosPromise<LoanProduct> {
    return apiClient.patch(`${PATH}/${id}`, params);
  }

  destroy(id: number): AxiosPromise {
    return apiClient.delete(`${PATH}/${id}`);
  }
}

export default new LoanProductService();
