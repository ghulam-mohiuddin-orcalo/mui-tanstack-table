import {
  ColumnDef,
  PaginationState
} from '@tanstack/react-table';
export interface TableProps<TData extends object> {
  data: TData[];
  columns: ColumnDef<TData>[];
  isLoading?: boolean;
  onRowClick?: (row: TData) => void;
  onRefresh?: () => void;
  enableRowSelection?: boolean;
  enableMultiRowSelection?: boolean;
  enableSorting?: boolean;
  enableColumnResizing?: boolean;
  enableColumnFilters?: boolean;
  enableGlobalFilter?: boolean;
  enablePagination?: boolean;
  enableColumnOrdering?: boolean;
  enableColumnVisibility?: boolean;
  pageCount?: number;
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void;
  pagination: { pageIndex: number; pageSize: number };
  totalCount?: number;
}