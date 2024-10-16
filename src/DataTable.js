import React, { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import {
  Box,
  IconButton,
  TextField,
  MenuItem,
  Drawer,
  Slider,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { FilterList } from '@mui/icons-material';
import sampleData from './sampleData.json';

const DataTable = () => {
  const [columnVisibility, setColumnVisibility] = useState({
    name: true,
    category: true,
    subcategory: true,
    price: true,
    createdAt: true,
    updatedAt: true,
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: [],
    subcategory: [],
    priceRange: [0, 1000],
    createdAtRange: { start: null, end: null },
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        filterFn: 'fuzzy',
      },
      {
        accessorKey: 'category',
        header: 'Category',
        filterFn: 'includes',
        enableGrouping: true,
      },
      {
        accessorKey: 'subcategory',
        header: 'Subcategory',
        filterFn: 'includes',
        enableGrouping: true,
      },
      {
        accessorKey: 'price',
        header: 'Price',
        filterFn: 'between',
        Cell: ({ cell }) => `$${cell.getValue()}`,
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        Cell: ({ cell }) =>
          new Date(cell.getValue()).toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated At',
        Cell: ({ cell }) =>
          new Date(cell.getValue()).toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
      },
    ],
    []
  );

  const handleToggleColumnVisibility = (column) => {
    setColumnVisibility((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  const handleCategoryFilterChange = (event) => {
    const value = event.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: value,
    }));
  };

  return (
    <div>
      {/* Drawer Trigger */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <IconButton onClick={() => setDrawerOpen(true)}>
          <FilterList />
        </IconButton>
      </Box>

      {/* Main Table Container */}
      <Box display="flex" flexDirection="column" alignItems="center">
        <MaterialReactTable
          columns={columns}
          data={sampleData}
          enableGrouping
          state={{ columnVisibility }}
          onColumnVisibilityChange={setColumnVisibility}
          enableSorting
          enableColumnFilters
          enablePagination
          pagination={{ pageSize: 10 }}
          positionPagination="bottom" // Position pagination at the bottom
          muiTablePaginationProps={{
            style: { display: 'flex', justifyContent: 'center' }, // Center pagination
          }}
        />
      </Box>

      {/* Filter Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box p={3} width={300}>
          <h3>Filters & Columns</h3>

          {/* Toggle Column Visibility */}
          <div>
            {Object.keys(columnVisibility).map((col) => (
              <FormControlLabel
                key={col}
                control={
                  <Checkbox
                    checked={columnVisibility[col]}
                    onChange={() => handleToggleColumnVisibility(col)}
                  />
                }
                label={col.charAt(0).toUpperCase() + col.slice(1)}
              />
            ))}
          </div>

          {/* Multi-select Dropdown for Category */}
          <TextField
            label="Filter by Category"
            select
            value={filters.category}
            onChange={handleCategoryFilterChange}
            SelectProps={{ multiple: true }}
            variant="outlined"
            margin="normal"
          >
            {Array.from(new Set(sampleData.map((item) => item.category))).map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>

          {/* Range Slider for Price */}
          <Slider
            value={filters.priceRange}
            onChange={(e, newValue) => setFilters((prev) => ({ ...prev, priceRange: newValue }))}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            step={10}
            marks
            sx={{ mt: 3 }}
          />

          {/* Date Range Filter */}
          <TextField
            label="Created At (Start)"
            type="date"
            value={filters.createdAtRange.start}
            onChange={(e) => setFilters((prev) => ({ ...prev, createdAtRange: { ...prev.createdAtRange, start: e.target.value } }))}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{ mt: 3 }}
          />
          <TextField
            label="Created At (End)"
            type="date"
            value={filters.createdAtRange.end}
            onChange={(e) => setFilters((prev) => ({ ...prev, createdAtRange: { ...prev.createdAtRange, end: e.target.value } }))}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{ mt: 3 }}
          />
        </Box>
      </Drawer>
    </div>
  );
};

export default DataTable;
