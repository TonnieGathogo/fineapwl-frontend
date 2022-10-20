import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import { useSettings } from 'src/@core/hooks/useSettings'
// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import TableHeader from 'src/components/events/list/TableHeader'
import AddEventDrawer from 'src/components/events/list/AddEvent'
import Box from '@mui/material/Box';
import {fetchEvents} from 'src/store/apps/event'
// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

const columns = [
 
  {
    flex: 0.06,
    minWidth: 35,
    field: 'title',
    headerName: 'Title',
    width: 150,
    editable: true,
  },
  {
    flex: 0.06,
    minWidth: 35,
    field: 'start_date',
    headerName: 'Date',
    width: 75,
    editable: true,
  },
  {
    flex: 0.06,
    minWidth: 35,
    field: 'venue',
    headerName: 'Venue',
    width: 110,
    editable: true,
  },
  {
    flex: 0.06,
    minWidth: 35,
    field: 'status',
    headerName: 'Status',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
 
  },
];

const EventsList=()=>{
  const theme = useTheme()
  const { settings } = useSettings()
    const [addEventOpen, setAddEventOpen] = useState(false)
    const [pageSize, setPageSize] = useState(10)
    const toggleAddEventDrawer = () => setAddEventOpen(!addEventOpen)
    const dispatch = useDispatch()
    const store = useSelector(state => state.event)
    useEffect(() => {
      dispatch(
        fetchEvents()
      )
    }, [dispatch])
    return(
        <Grid container spacing={6}>
            <PageHeader
              title={<Typography variant='h5'>Event List</Typography>}
              subtitle={<Typography variant='body2'>FineApwl Events Created </Typography>}
            />
          
               <Grid item xs={12}>
          <Card>
            <TableHeader toggle={toggleAddEventDrawer}  />
            <DataGrid
              autoHeight
              rows={store.data}
              columns={columns}
              pageSize={pageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[10, 25, 50]}
              sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            />
           
          </Card>
        </Grid>

        <Grid item xs={12}>

        <AddEventDrawer open={addEventOpen} toggle={toggleAddEventDrawer} />
        </Grid>
        </Grid>

    )
}

export default EventsList