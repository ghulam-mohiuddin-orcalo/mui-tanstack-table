'use client';
import { useEffect, useState } from "react";
import { Box, Button, Chip, Divider } from "@mui/material";
import { TanstackTable } from "@/components/TanstackTable";
import styles from "./page.module.css";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
}

const mockApiResponse = {
  data: [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'pending' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Viewer', status: 'inactive' },
    { id: 5, name: 'Charlie Black', email: 'cli@example.com', role: 'Admin', status: 'active' },
    { id: 6, name: 'Diana White', email: 'dane@example.com', role: 'User', status: 'inactive' },
    { id: 11, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
    { id: 21, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
    { id: 31, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'pending' },
    { id: 41, name: 'Alice Brown', email: 'alice@example.com', role: 'Viewer', status: 'inactive' },
    { id: 51, name: 'Charlie Black', email: 'cli@example.com', role: 'Admin', status: 'active' },
    { id: 61, name: 'Diana White', email: 'dane@example.com', role: 'User', status: 'inactive' },
    { id: 123, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
    { id: 223, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
    { id: 323, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'pending' },
    { id: 432, name: 'Alice Brown', email: 'alice@example.com', role: 'Viewer', status: 'inactive' },
    { id: 523, name: 'Charlie Black', email: 'cli@example.com', role: 'Admin', status: 'active' },
    { id: 623, name: 'Diana White', email: 'dane@example.com', role: 'User', status: 'inactive' },
    { id: 1123, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
    { id: 2132, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
    { id: 3132, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'pending' },
    { id: 4132, name: 'Alice Brown', email: 'alice@example.com', role: 'Viewer', status: 'inactive' },
    { id: 5132, name: 'Charlie Black', email: 'cli@example.com', role: 'Admin', status: 'active' },
    { id: 6123, name: 'Diana White', email: 'dane@example.com', role: 'User', status: 'inactive' },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 5,
      totalCount: 24,
    }
  }
}

export default function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [totalCount, setTotalCount] = useState(0);
  console.log('pagination::: ', pagination);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const start = pagination.pageIndex * pagination.pageSize;
        const end = start + pagination.pageSize;
        const pageData: any = mockApiResponse.data.slice(start, end);
        setData(pageData);
        setTotalCount(mockApiResponse.meta.pagination.totalCount);
        setIsLoading(false);
      }, 1000);
    };

    fetchData();
  }, [pagination]);

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info: any) => (
        <Chip
          label={info.getValue()}
          color={
            info.getValue() === 'active' ? 'success' :
              info.getValue() === 'pending' ? 'warning' : 'error'
          }
          size="small"
        />
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (info: any) => (
        <Button
          variant="outlined"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Action clicked for row:', info.row.original);
          }}
        >
          Edit
        </Button>
      ),
      enableSorting: false,
    },
  ];

  return (
    <Box>
      <h1 className={styles.title}>Welcome to Toolpad</h1>
      <p className={styles.description}>
        Get started by editing&nbsp;
        <code className={styles.code}>src/app/page.tsx</code>
      </p>
      <Divider sx={{ my: 5 }} />

      <TanstackTable
        data={data || []}
        columns={columns}
        isLoading={isLoading}
        enableRowSelection={true}
        enableMultiRowSelection={true}
        enablePagination
        pagination={pagination}
        onPaginationChange={setPagination}
        totalCount={totalCount}
        onRowSelectionChange={(selectedRows: any) => { console.log('Selected rowsouter:', selectedRows); }}
      />
    </Box>
  );
}
