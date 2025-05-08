import React, { useMemo, useState, useCallback } from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel,
  TablePagination,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Typography,
  Box,
  Stack,
  Chip,
  CircularProgress
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Refresh as RefreshIcon,
  ViewColumn as ViewColumnIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon
} from '@mui/icons-material';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  ColumnResizeMode,
  ColumnOrderState,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  FilterFn,
  SortingFn,
} from '@tanstack/react-table';
// import { rankItem } from '@tanstack/match-sorter-utils';
import { TableProps } from './TanstackTable.interface';

export const TanstackTable = <TData extends object>({
  data,
  columns,
  isLoading = false,
  onRowClick,
  onRefresh,
  enableRowSelection = true,
  enableMultiRowSelection = true,
  enableSorting = true,
  enableColumnResizing = true,
  enableColumnFilters = true,
  enableGlobalFilter = true,
  enablePagination = true,
  enableColumnOrdering = true,
  enableColumnVisibility = true,
  pageCount,
  onPaginationChange,
  pagination = { pageIndex: 0, pageSize: 5 },
  totalCount = 0,
}: TableProps<TData>) => {

  // State management
  const [rowSelection, setRowSelection] = useState({});

  // Column definitions
  const memoizedColumns = useMemo<ColumnDef<TData>[]>(() => {
    const baseColumns = [...columns];

    if (enableRowSelection) {
      baseColumns.unshift({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            indeterminate={table.getIsSomeRowsSelected()}
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        size: 50,
      });
    }

    return baseColumns;
  }, [columns, enableRowSelection]);

  // Table instance
  const table = useReactTable({
    data,
    columns: memoizedColumns,
    state: {
      // columnOrder,
      // columnFilters,
      // globalFilter,
      // sorting,
      // columnVisibility,
      rowSelection,
      pagination,
    },
    onPaginationChange,
    manualPagination: true,
    pageCount,
    // onColumnOrderChange: setColumnOrder,
    // onColumnFiltersChange: setColumnFilters,
    // onGlobalFilterChange: setGlobalFilter,
    // onSortingChange: setSorting,
    // onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    // globalFilterFn: fuzzyFilter,
    // columnResizeMode,
    enableRowSelection,
    enableMultiRowSelection,
  });

  const handleRowClick = (row: any) => {
    if (onRowClick) onRowClick(row.original);
  };

  return (
    <TableContainer component={Paper}>
      <Table>

        <TableHead>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableCell key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box
                        onClick={header.column.getToggleSortingHandler()}
                        sx={{
                          cursor: enableSorting ? 'pointer' : 'default',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {enableSorting && header.column.getCanSort() && (
                          <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
                            <ArrowUpwardIcon
                              fontSize="small"
                              sx={{
                                opacity: header.column.getIsSorted() === 'asc' ? 1 : 0.3,
                                mb: -0.5
                              }}
                            />
                            <ArrowDownwardIcon
                              fontSize="small"
                              sx={{
                                opacity: header.column.getIsSorted() === 'desc' ? 1 : 0.3,
                                mt: -0.5
                              }}
                            />
                          </Box>
                        )}
                      </Box>

                      {enableColumnResizing && (
                        <Box
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          sx={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            height: '100%',
                            width: 4,
                            bgcolor: 'divider',
                            cursor: 'col-resize',
                            '&:hover': {
                              bgcolor: 'primary.main',
                            },
                          }}
                        />
                      )}
                    </Box>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow
              key={row.id}
              hover
              onClick={() => handleRowClick(row)}
              sx={{
                cursor: onRowClick ? 'pointer' : 'default',
                '&:last-child td': { borderBottom: 0 },
              }}
            >
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      {enablePagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={totalCount || data.length}
          rowsPerPage={pagination?.pageSize}
          page={pagination?.pageIndex}
          onPageChange={(_, page) => {
            onPaginationChange?.({ ...pagination, pageIndex: page });
          }}
          onRowsPerPageChange={(e) => {
            const pageSize = Number(e.target.value);
            onPaginationChange?.({
              pageIndex: 0, // Reset to first page when page size changes
              pageSize
            });
          }}
        />
      )}
    </TableContainer>
  )
}
