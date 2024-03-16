"use client";

import React, { useEffect, useState } from "react";
import Chart from 'chart.js/auto';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Navbar } from "@/components/navbar";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Chip,
  User,
  Pagination,
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { SearchIcon } from "./SearchIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { columns, users, statusOptions } from "./data";
import { capitalize } from "./utils";
import { getAuthSession } from "@/lib/auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const statusColorMap: Record<string, ChipProps["color"]> = {
  engagement: "success",
  excitement: "danger",
  boredom: "warning",
  confused: "success",
  frustrated: "danger",
  fearful: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

type User = (typeof users)[0];


export default function History() {
  const [random, setRandom] = React.useState([55, 49, 46, 40, 36, 30, 25, 19, 14, 10]);

  const generateRandomNumbers = () => {
    const min = 1;
    const max = 60;
    const count = 12;

    const randomNumbers = [];

    for (let i = 0; i < count; i++) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      randomNumbers.push(randomNumber);
    }
    // return randomNumbers
    setRandom(randomNumbers);
    // console.log(random);
  };

  const TimeSlotList: React.FC = () => {
    // Define the start and end times
    const startTime = new Date();
    startTime.setHours(10, 0, 0); // 10:00 AM

    const endTime = new Date();
    endTime.setHours(11, 0, 0); // 11:00 AM

    // Initialize an array to store the time slots
    const timeSlots: string[] = [];

    // Create time slots at a 5-minute interval
    const intervalMinutes = 5;
    let currentTime = new Date(startTime);

    while (currentTime < endTime) {
      // Format the current time as HH:MM
      const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // Add the formatted time to the time slots array
      timeSlots.push(formattedTime);

      // Increment the current time by the interval
      currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
    }

    return timeSlots
  };

  const GraphComponent = () => {
    useEffect(() => {
      const ctx = document.getElementById('mybargraph') as HTMLCanvasElement | null;

      const data = { 'confusion': 10, 'engagement': 3, 'frustration': 5, "excitement": 7, "satisfaction": 18, "boredom": 9 }

      if (!ctx) {
        console.error("Canvas element 'mybargraph' not found.");
        return;
      }

      let config = {
        type: 'bar',
        data: {
          labels: Object.keys(data),
          datasets: [
            {
              label: 'Emotion vs Student Count',
              data: Object.values(data),
              borderWidth: 1,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
            },
          ],
        },
        options: {
          // plugins:{
          //   legend:{
          //     title: ''
          //   }
          // },
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          transitions: {
            show: {
              animations: {
                x: {
                  from: 0
                },
                y: {
                  from: 0
                }
              }
            }, hide: {
              animations: {
                x: {
                  to: 0
                },
                y: {
                  to: 0
                }
              }
            },
            active: {
              animation: {
                duration: 7000
              }
            }
          }

        },
      }

      new Chart(ctx, config);
    }, []);


    return (
      <div className="relative h-96 w-96">
        <canvas id="mybargraph" ></canvas>
      </div>
    );
  };

  const RadarComponent = () => {
    useEffect(() => {
      const ctx = document.getElementById('myradargraph') as HTMLCanvasElement | null;

      const data = { 'confusion': 10, 'engagement': 3, 'frustration': 5, "excitement": 7, "satisfaction": 18, "boredom": 9 }

      if (!ctx) {
        console.error("Canvas element 'myradargraph' not found.");
        return;
      }

      let config = {
        type: 'radar',
        data: {
          labels: Object.keys(data),
          datasets: [
            {
              label: 'Electrostats',
              data: [65, 59, 90, 81, 56, 55, 40],
              borderWidth: 1,
              fill: true,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgb(255, 99, 132)',
              pointBackgroundColor: 'rgb(255, 99, 132)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgb(255, 99, 132)'
            },
            {
              label: 'Gravitation',
              data: [28, 48, 40, 19, 96, 27],
              fill: true,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgb(54, 162, 235)',
              pointBackgroundColor: 'rgb(54, 162, 235)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgb(54, 162, 235)'
            },
          ],
        },
        options: {
          // plugins:{
          //   legend:{
          //     title: ''
          //   }
          // },
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          transitions: {
            show: {
              animations: {
                x: {
                  from: 0
                },
                y: {
                  from: 0
                }
              }
            }, hide: {
              animations: {
                x: {
                  to: 0
                },
                y: {
                  to: 0
                }
              }
            },
            active: {
              animation: {
                duration: 7000
              }
            }
          },
          elements:{
            line:{
              borderWidth: 3
            }
          }

        },
      }

      new Chart(ctx, config);
    }, []);


    return (
      <div className="relative h-96 w-96">
        <canvas id="myradargraph" ></canvas>
      </div>
    );
  };

  const LineComponent = ({ emotion }) => {
    useEffect(() => {
      const ctx = document.getElementById('mylinechart') as HTMLCanvasElement | null;

      const data = TimeSlotList();

      if (!ctx) {
        console.error("Canvas element 'mylinechart' not found.");
        return;
      }

      let config = {
        type: 'line',
        data: {
          labels: data,
          datasets: [
            {
              label: `Average Emotion of the slot`,
              data: random,
              borderWidth: 1,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              // backgroundColor:'#FFFFFF',
              color: '#FFFFFF',
              tension: 0.1
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          animations: {
            tension: {
              duration: 1000,
              easing: 'linear',
              from: 1,
              to: 0,
              // loop: true
            }
          },
          scales: {
            y: { // defining min and max so hiding the dataset does not change scale range
              min: 0,
              max: 100
            }
          }

        },
      }

      new Chart(ctx, config);
    }, []);


    return (
      <div className="relative h-96 w-96 ">
        <canvas id="mylinechart" ></canvas>
      </div>
    );
  };

  const { status, data } = useSession();
  const router = useRouter()
  useEffect(() => {
    if (status === "authenticated") {
      //! come back to this
      // router.push("/");
    }
  }, []);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<PlusIcon />}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const [selectedEmotion, setSelectedEmotion] = React.useState(new Set(["Engagement"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedEmotion).join(", ").replaceAll("_", " "),
    [selectedEmotion]
  );

  let emotions = ['confusion', 'engagement', 'frustration', "excitement", "satisfaction", "boredom"]

  return (
    <>
      <Navbar />


      {/* graphs */}

      <h3 className="pb-3 mt-10 text-white sm:text-6xl line-clamp-6">
        <span className="text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text flex justify-center">
          Student Statistics
        </span>
      </h3>

      <div className='flex gap-20 my-20 mx-16'>
        <GraphComponent />
        <div className="flex flex-col">
          <LineComponent emotion={selectedEmotion} />
          <Dropdown className="mt-12">
            <DropdownTrigger>
              <Button
                variant="shadow"
                color="secondary"
                className="capitalize"
                onClick={generateRandomNumbers}
              >
                {selectedValue}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Single selection example"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedEmotion}
              onSelectionChange={setSelectedEmotion}
              variant="shadow"
              color="secondary"
            >
              {
                emotions.map((emotion, index) => (
                  <DropdownItem key={emotion.toUpperCase()}>{emotion}</DropdownItem>
                ))
              }
            </DropdownMenu>
          </Dropdown>
        </div>
        <RadarComponent/>
      </div>


      {/* table */}

      <div>
        <div className="flex p-10 m-10">
          <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
              wrapper: "max-h-[382px]",
            }}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
          >
            <TableHeader columns={headerColumns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                  allowsSorting={column.sortable}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={"No users found"} items={sortedItems}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>


    </>
  );
}
