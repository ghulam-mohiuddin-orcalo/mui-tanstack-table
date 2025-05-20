import {
  ColumnDef,
  PaginationState,
  OnChangeFn
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
  onPaginationChange?: OnChangeFn<PaginationState>;
  pagination: { pageIndex: number; pageSize: number };
  totalCount?: number;
  onRowSelectionChange?: (selectedRows: TData[]) => void;
  stickyHeader?: boolean;
}