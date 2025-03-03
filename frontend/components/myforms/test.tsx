import React, { useState } from 'react';
import { Table, Pagination, Text } from '@mantine/core';
import { useTable, useSortBy, usePagination } from 'react-table';

const MantineTable = ({ recordsData, initialRecords, pageSize, PAGE_SIZES, actionStatusList, sortStatus, setSortStatus, setPageSize, setPage, page }) => {
  const [isTouch, setIsTouch] = useState(false); // Define isTouch as needed or pass it as a prop

  const columns = React.useMemo(
    () => [
      {
        Header: 'รหัสพนักงาน',
        accessor: 'Target_ID',
      },
      {
        Header: 'ชื่อ-นามสกุล',
        accessor: 'Target_Name',
      },
      {
        Header: 'ตำแหน่ง',
        accessor: 'Target_Position',
      },
      {
        Header: 'สังกัด',
        accessor: 'Target_Sector',
      },
      {
        Header: 'ดำเนินการ',
        accessor: 'Action',
        Cell: ({ row }) => (
          <div>
            {actionStatusList(row.original.id, row.original.Status)}
          </div>
        ),
        align: 'center',
      },
    ],
    [actionStatusList]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex, pageSize: pageSizeState },
  } = useTable(
    {
      columns,
      data: recordsData,
      initialState: { pageIndex: page, pageSize },
      manualPagination: true,
      pageCount: Math.ceil(initialRecords.length / pageSize),
    },
    useSortBy,
    usePagination
  );

  return (
    <div>
      <Table {...getTableProps()} striped highlightOnHover withBorder>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>

      <div style={{ marginTop: 20 }}>
        <Text align="center">
          แสดงจาก {pageIndex * pageSize + 1} ถึง{' '}
          {Math.min((pageIndex + 1) * pageSize, initialRecords.length)} จากทั้งหมด{' '}
          {initialRecords.length} รายการ
        </Text>

        <Pagination
          page={pageIndex + 1}
          onChange={newPage => setPage(newPage - 1)}
          total={Math.ceil(initialRecords.length / pageSize)}
        />

        <div style={{ marginTop: 10 }}>
          <Text align="center">จำนวนรายการต่อหน้า</Text>
          <select
            value={pageSizeState}
            onChange={e => setPageSize(Number(e.target.value))}
          >
            {PAGE_SIZES.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default MantineTable;
